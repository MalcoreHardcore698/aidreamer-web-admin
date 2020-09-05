/*
 * COMPONENT: TextArea
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import '../styles/TextArea.css'

export default ({ options }) => {
    const {
        ref,
        type,
        value,
        name,
        defaultValue,
        placeholder='Write a message...',
        onChange=() => {}, resize=false
    } = options || {}

    const classes = [
        'ui-textarea',
        type
    ]

    return (
        <textarea
            ref={ref}
            name={name}
            value={value}
            defaultValue={defaultValue}
            className={classes.join(' ')}
            placeholder={placeholder}
            style={{ resize: (resize) ? 'auto' : 'none' }}
            onChange={onChange}
        />
    )
}