/*
 * COMPONENT: Row
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import '../styles/Row.css'

export default (props) => {
    const Children = props.children

    const classes = [
        'ui-row',
        props.type,
        props.className
    ]

    return (
        <div className={classes.join(' ')} style={{ ...props.style }}>
            {Children}
        </div>
    )
}