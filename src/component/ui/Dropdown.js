/*
 * COMPONENT: Dropdown
 * 
 * MISSION: ...
 * IMPORTANT: Parent component must be 'relative' position
 *
**/

import React, { useRef } from 'react'
import '../styles/Dropdown.css'

export default (props) => {
    const Children = props.children

    const {
        type, styles, dropdown
    } = props.options || {}

    const classes = [
        'ui-dropdown',
        type
    ]

    const dropdownRef = useRef()

    if (!dropdown) return null

    return (
        <div
            ref={dropdownRef}
            className={classes.join(' ')}
            style={styles}
        >
            {Children}
        </div>
    )
}