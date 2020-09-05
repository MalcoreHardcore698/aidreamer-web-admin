/*
 * COMPONENT: Button
 * 
 * MISSION: Rendering Image with given properties
 *
**/

import React from 'react'
import Ripples from 'react-ripples'
import '../styles/Button.css'

const Button = ({ type, child, classes, disabled, handler }) => {
    const handlerClick = async (e) => {
        e.preventDefault()
        await handler(e)
    }

    return (
        <button
            type={type}
            className={classes.join(' ')}
            disabled={disabled}
            onClick={(handler) && handlerClick}
        >
            {child}
        </button>
    )
}

const Ripple = ({ type, child, classes, disabled, handler }) => {
    if (handler)
        return (
            <Ripples color="#afbdc4" during={1000}>
                <Button
                    type={type}
                    child={child}
                    classes={classes}
                    disabled={disabled}
                    handler={handler}
                />
            </Ripples>
        )

    return (
        <Ripples color="#afbdc4" during={1000}>
            <Button
                type={type}
                child={child}
                classes={classes}
                disabled={disabled}
            />
        </Ripples>
    )
}

export default (props) => {
    const Children = props.children

    const {
        type, state,
        classNames, disabled,
        handler,
    } = props.options || {}

    const classes = [
        'ui-button',
        classNames,
        state
    ]

    const options = {
        type,
        child: Children,
        classes,
        disabled
    }

    return <Ripple {...options} handler={handler} />
}