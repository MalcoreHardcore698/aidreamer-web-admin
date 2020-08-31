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
        value,
        placeholder='Write a message...',
        onChange=() => {}
    } = options

    const classes = [
        'ui-input'
    ]

    return (
        <input
            type={type}
            value={value}
            className={classes.join(' ')}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}