/*
 * COMPONENT: Select
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import Select, { components } from 'react-select'
import '../styles/Select.css'

const Menu = (props) => {
    return (
        <div className="ui-select-menu">
            <components.Menu {...props}>{props.children}</components.Menu>
        </div>
    )
}

export default ({ options }) => {
    const classes = [
        'ui-select'
    ]

    return (
        <div className={classes.join(' ')}>
            <Select {...options} components={{ Menu }} />
        </div>
    )
}