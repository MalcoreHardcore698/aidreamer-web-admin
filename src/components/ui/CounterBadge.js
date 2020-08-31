/*
 * COMPONENT: CounterBadge
 * 
 * MISSION: Rendering number into circle/oval
 *
**/

import React from 'react'
import '../styles/CounterBadge.css'

export default ({ options }) => {
    const {
        type,
        color,
        background,
        count
    } = options

    const classes = [
        'ui-counter-badge', type
    ]

    return (
        <span
            className={classes.join(' ')}
            style={{
                color, background
            }}
        >{count}</span>
    )
}