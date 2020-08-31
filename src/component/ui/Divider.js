/*
 * COMPONENT: Entry
 * 
 * MISSION: Space between components
 *
**/

import React from 'react'
import '../styles/Divider.css'

export default ({ distance, horizontal }) => {
    const classes = [
        'ui-divider'
    ]

    const d = Math.round((distance) / 2)

    return (
        <div
            className={classes.join(' ')}
            style={{ margin: (horizontal) ? `${d}px 0` : `0 ${d}px` }}
        />
    )
}