/*
 * COMPONENT: Button
 * 
 * MISSION: Rendering Image with given properties
 *
**/

import React from 'react'
import Ripples from 'react-ripples'
import '../styles/Button.css'

const Button = ({ child, classes, disabled, handler }) => {
    const handlerClick = async (e) => {
        e.preventDefault()
        await handler(e)
    }

    return (
        <button
            className={classes.join(' ')}
            disabled={disabled}
            onClick={handlerClick}
        >
            {child}
        </button>
    )
}

const Ripple = ({ child, classes, handler }) => {
    return (
        <Ripples color="#f3f3f3" during={1000}>
            <Button child={child} classes={classes} handler={handler} />
        </Ripples>
    )
}

export default (props) => {
    const Children = props.children

    const {
        type, state,
        classNames, disabled,
        handler=(e) => { e.preventDefault() },
    } = props.options || {}

    const classes = [
        'ui-button',
        classNames,
        type, state
    ]

    const options = {
        child: Children,
        classes, handler,
        disabled
    }

    if (state === 'active')
        return <Ripple {...options} />

    return <Button {...options} />
}