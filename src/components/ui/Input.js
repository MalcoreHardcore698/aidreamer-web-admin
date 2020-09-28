/*
 * COMPONENT: Input
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import '../styles/Input.css'

export default ({ options, hidden=false }) => {
    const {
        type='text',
        state,
        name,
        value,
        inputRef,
        defaultValue,
        placeholder='Write a message...',
        autoComplete="off",
        onChange=() => {},
        onKeyPress=() => {}
    } = options

    const classes = [
        'ui-input', state,
        (hidden) ? 'hidden' : ''
    ]

    return (
        <input
            ref={inputRef}
            type={type}
            name={name}
            value={value}
            defaultValue={defaultValue}
            className={classes.join(' ')}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={onChange}
            onKeyPress={onKeyPress}
        />
    )
}