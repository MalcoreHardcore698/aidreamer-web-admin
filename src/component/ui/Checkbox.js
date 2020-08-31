/*
 * COMPONENT: Checkbox
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import '../styles/Checkbox.css'

export default ({ options }) => {
    const {
        type,
        list=[],
        handler
    } = options || {}

    const classes = [
        'ui-checkbox',
        type
    ]

    const handlerChecked = (item) => {
        handler(list.map(el => (el.id === item.id)
        ? ({
            ...el,
            checked: !el.checked
        }) : ({
            ...el
        })))
    }

    return (
        <ul className={classes.join(' ')}>
            {list.map((item, key) =>
                <li key={key} onClick={() => handlerChecked(item)} className={(item.checked) ? 'checked' : 'empty'}>
                    <div className="checkmark">
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <p>{item.value}</p>
                </li>    
            )}
        </ul>
    )
}