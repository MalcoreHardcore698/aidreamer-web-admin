/*
 * COMPONENT: Avatar
 * 
 * MISSION: Rendering Image with given properties
 *
**/

import React from 'react'
import '../styles/Avatar.css'
import { config } from '../../utils/config'

const api = config.get('api')

export default ({ avatar, properties=[] }) => {
    const classes = [
        'ui-avatar',
        ...properties
    ]

    return (
        <div className={classes.join(' ')}>
            <img src={(avatar?.path || '').replace('./', `${api}/`)} alt="Avatar" />
        </div>
    )
}