/*
 * COMPONENT: Message
 * 
 * MISSION: ...
 *
**/

import React from 'react'

import '../styles/Message.css'

export default ({ text, padding }) => {
    return (
        <p
            className="ui-message"
            style={{ padding: (padding) ? 15 : 0 }}
        >{text}</p>
    )
}