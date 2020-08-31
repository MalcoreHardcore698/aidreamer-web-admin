/*
 * COMPONENT: Alert
 * 
 * MISSION: Modal content with buttons. Confirmation anything
 * or warnings about something
 *
**/

import React from 'react'
import '../styles/Alert.css'

export default ({ type, message }) => {
    const classes = [
        'ui-alert',
        type
    ]

    return (
        <div className={classes.join(' ')}>
            {message}
        </div>
    )
}