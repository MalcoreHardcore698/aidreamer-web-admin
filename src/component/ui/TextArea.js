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
        type,
        value,
        placeholder='Write a message...',
        onChange=() => {}, resize=false
    } = options || {}

    const classes = [
        'ui-textarea',
        type
    ]

    return (
        <textarea
            value={value}
            className={classes.join(' ')}
            placeholder={placeholder}
            style={{ resize: (resize) ? 'auto' : 'none' }}
            onChange={onChange}
        />
    )
}