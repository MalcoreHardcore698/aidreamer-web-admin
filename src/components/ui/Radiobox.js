/*
 * COMPONENT: Checkbox
 * 
 * MISSION: ...
 *
**/

import React, { useState, useEffect } from 'react'
import '../styles/Radiobox.css'

export default ({ options }) => {
    const {
        type,
        list=[],
        handler
    } = options || {}

    const classes = [
        'ui-radiobox',
        type
    ]

    const [checked, setChecked] = useState(list)

    const handlerChecked = (item) => {
        setChecked(checked.map(el => (el.id === item.id)
            ? ({
                ...el,
                checked: true
            }) : ({
                ...el,
                checked: false
            })))
    }

    useEffect(() => {
        handler(checked)
    }, [handler, checked])

    return (
        <ul className={classes.join(' ')}>
            {checked.map((item, key) =>
                <li key={key} onClick={() => handlerChecked(item)} className={(item.checked) ? 'checked' : 'empty'}>
                    <div className="checkmark"><span></span></div>
                    <p>{item.value}</p>
                </li>    
            )}
        </ul>
    )
}