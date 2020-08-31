/*
 * COMPONENT: Avatar
 * 
 * MISSION: Rendering Image with given properties
 *
**/

import React from 'react'
import '../styles/Avatar.css'

export default ({ avatar, properties=[] }) => {
    const classes = [
        'ui-avatar',
        ...properties
    ]

    return (
        <div className={classes.join(' ')}>
            <img src={avatar?.path} alt="Avatar" />
        </div>
    )
}