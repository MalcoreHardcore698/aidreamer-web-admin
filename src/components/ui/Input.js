/*
 * COMPONENT: Input
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import '../styles/Input.css'

export default ({ options }) => {
    const {
        type='text',
        value, ref, name,
        defaultValue,
        placeholder='Write a message...',
        autoComplete="Default text",
        onChange=() => {},
        onKeyPress=() => {}
    } = options

    const classes = [
        'ui-input'
    ]

    return (
        <input
            ref={ref}
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