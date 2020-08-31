/*
 * COMPONENT: Select
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import Select from 'react-select'

export default ({ options }) => {
    const classes = [
        'ui-select'
    ]

    return (
        <div className={classes.join(' ')}>
            <Select {...options} />
        </div>
    )
}