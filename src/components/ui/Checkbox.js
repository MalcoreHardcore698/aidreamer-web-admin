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
        state=[],
        list=[],
        handler
    } = options || {}

    const classes = [
        'ui-checkbox',
        type
    ]

    const handlerChecked = (item) => {
        const founded = state.find(el => el.id === item.id)
        handler((founded)
            ? state.filter(el => el.id !== item.id)
            : ([ ...state, item ])
        )
    }

    return (
        <ul className={classes.join(' ')}>
            {list.map((item, key) =>
                <li key={key} onClick={() => handlerChecked(item)} className={(state.find(el => el.id === item.id)) ? 'checked' : 'empty'}>
                    <div className="checkmark">
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <p>{item.title}</p>
                </li>    
            )}
        </ul>
    )
}