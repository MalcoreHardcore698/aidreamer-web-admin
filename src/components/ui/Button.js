/*
 * COMPONENT: Button
 * 
 * MISSION: Rendering Image with given properties
 *
**/

import React from 'react'
import Ripples from 'react-ripples'
import { Link } from 'react-router-dom'
import '../styles/Button.css'

const Button = ({ type, child, classes, disabled, path, handler }) => {
    const handlerClick = async (e) => {
        e.preventDefault()
        await handler(e)
    }

    if (type === 'link') {
        return (
            <Link
                to={path}
                className={classes.join(' ')}
                disabled={disabled}
                onClick={(handler) && handlerClick}
            >

            </Link>
        )
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

const Ripple = ({ type, child, classes, disabled, path, handler }) => {
    if (handler)
        return (
            <Ripples color="#afbdc4" during={1000}>
                <Button
                    type={type}
                    path={path}
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
                path={path}
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
        handler, path
    } = props.options || {}

    const classes = [
        'ui-button',
        classNames,
        state
    ]

    const options = {
        type, path,
        child: Children,
        disabled
    }

    return (
        <Ripple
            {...options}
            classes={classes}
            handler={handler}
        />
    )
}