/*
 * COMPONENT: Toggler
 * 
 * MISSION: ...
 *
**/
import React, { useState, useEffect, useRef } from 'react'
import { useWindowSize } from '../../hooks/window.size.hook'
import Row from './Row'
import Container from './Container'
import Input from './Input'
import Button from './Button'
import Message from './Message'
import Dropdown from './Dropdown'
import List from './List'
import '../styles/Toggler.css'

const styles = {
    dropdown: { right: 0 }
}

function targetsRepletion({
    all,
    name,
    targets,
    handleRef,
    toggleRef,
    slicedFactor,
    initialOptions,

    dropdown,
    setDropdown,

    state,
    setState,
    setValue
}) {
    const allOption = (all) && ({
        value: 'all',
        label: <Row><p>All</p></Row>
    })

    const slicedStartOptions = targets
        .filter(t => t.value !== 'all')
        .filter(t => t.value !== 'erase')
        .slice(0, slicedFactor)
    let slicedEndOptions = initialOptions
        .filter(option => !slicedStartOptions
            .find(op => op.value === option.value)
        )

    if (state) {
        const candidate = slicedEndOptions.find(o => o.value === state)

        if (candidate) {
            slicedEndOptions = slicedEndOptions.filter(o => o.value !== candidate.value)
            slicedEndOptions.unshift(slicedStartOptions.shift())

            slicedStartOptions.unshift(candidate)
        }
    }

    const eraseOption = (slicedFactor < initialOptions.length) ? {
        value: 'erase',
        disabled: (slicedEndOptions.length === targets.length),
        classNames: 'dropdown',
        label: (
            <Container clear sticky>
                <Button options={{
                    state: 'inactive',
                    handler: () => setDropdown(!dropdown)
                }}>
                    <div className={`ui-icon dots${dropdown ? ' active' : ''}`}>
                        <span></span><span></span><span></span>
                    </div>
                </Button>

                <Dropdown options={{ dropdown, styles: styles.dropdown }}>
                    <List options={{
                        list: slicedEndOptions.map(hub => ({ id: hub.value, label: hub.label})),
                        handlerItem: (item) => {
                            setDropdown(false)
                            setState(item.id)
                            if (setValue) setValue(name, item.id)
                            handleRef.current.style.left = '-1px'
                            handleRef.current.style.width = `${toggleRef.current.offsetWidth}px`
                        }
                    }}>
                        {({ item }) => (
                            <div className="name">{item.label}</div>
                        )}
                    </List>
                </Dropdown>
            </Container>
        )
    } : null

    const result = []

    if (allOption)
        result.push(allOption)

    result.push(...slicedStartOptions)

    if (eraseOption)
        result.push(eraseOption)

    return result
}

export default ({ all, options }) => {
    const {
        type,
        name,
        initialSlicedFactor=2,
        initialState={},
        initialOptions=[],
        register, setValue
    } = options || {}
    const handleRef = useRef(null)
    const toggleRef = useRef(null)

    const size = useWindowSize()
    const [dropdown, setDropdown] = useState(false)

    const [slicedFactor, setSlicedFactor] = useState((all) ? initialSlicedFactor - 1 : initialSlicedFactor)

    const [state, setState] = useState(initialState)
    const [targets, setTargets] = useState(initialOptions)

    const classes = [
        'ui-toggler',
        type
    ]

    const classesToggle = (target) => [
        'toggle',
        (target?.classNames),
        (target.value === state) ? ' active' : ''
    ]

    const handlerState = (e, target, index) => {
        if (target === 'erase')
            return null

        const isToggle = (element) => element.classList.contains('toggle')

        const offsetHandle = (element) => {
            if (!element) return
            const offset = element.offsetWidth * index
            handleRef.current.style.left = `${(offset === 0) ? offset - 1 : offset + 1}px`
            handleRef.current.style.width = `${element.offsetWidth}px`
        }

        const searchToggle = (element) => {
            if (isToggle(element)) return element
            else return searchToggle(element.parentElement)
        }

        if (isToggle(e.target))
            offsetHandle(e.target)
        else
            offsetHandle(searchToggle(e.target))

        setState(target)
        if (setValue) setValue(name, target)
    }

    useEffect(() => {
        setTargets(prev => targetsRepletion({
                all,
                name,
                handleRef,
                toggleRef,
                targets: prev,
                initialOptions,
                slicedFactor,

                dropdown,
                setDropdown,

                state,
                setState,
                setValue
            })
        )
    }, [all, name, state, dropdown, initialOptions, slicedFactor, setValue])

    useEffect(() => {
        const factor = (all) ? initialSlicedFactor - 1 : initialSlicedFactor
        if (size.width <= 580) {
            setSlicedFactor((factor === 2) ? 1 : 0)
        } else if (size.width <= 768) {
            setSlicedFactor((factor < 3) ? factor : factor - 2)
        } else if (size.width <= 998) {
            setSlicedFactor((factor === 0) ? factor : factor - 1)
        } else {
            setSlicedFactor(factor)
        }
    }, [all, size.width, initialSlicedFactor])

    return (
        <div className={classes.join(' ')} style={{
            gridTemplateColumns: `repeat(${((slicedFactor === initialOptions.length)
                ? initialOptions.length : targets.length - 1)}, 1fr)${
                (slicedFactor === initialOptions.length) ? '' : ' 40px'
            }`
        }}>
            {targets.filter(t => t).map((target, key) =>
                (!target.disabled && (key === 0)) ?
                    <div
                        key={key}
                        ref={toggleRef}
                        className={classesToggle(target).join(' ')}
                        onClick={(e) => handlerState(e, target.value, key)}
                    >
                        <div className="toggle-wrapper"></div>
                        {target.label}
                    </div>
                : (!target.disabled) ?
                    <div
                        key={key}
                        className={classesToggle(target).join(' ')}
                        onClick={(e) => handlerState(e, target.value, key)}
                    >
                        <div className="toggle-wrapper"></div>
                        {target.label}
                    </div>
                : null
            )}
            <div ref={handleRef} className="handle"></div>
            <Input options={{
                name, inputRef: register
            }} hidden />
            {(!targets || targets.length === 0) && <Message text="No Content" />}
        </div>
    )
}