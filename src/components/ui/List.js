/*
 * COMPONENT: List
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import '../styles/List.css'

export default (props) => {
    const Children = props.children

    const {
        list,
        state={},
        handler,
        handlerItem,
    } = props.options || {}

    const classes = [
        'ui-list',
        (handler) ? ' clickable' : ''
    ]

    return (
        <div
            className={classes.join(' ')}
            onClick={() => (handler) && handler()}
        >
            {list.map((item, key) => (
                <div
                    key={key}
                    className={`ui-item${(state.id === item.id) ? ' checked' : ''}`}
                    onClick={() => (handlerItem) && handlerItem(item)}
                >
                    <Children item={item} />
                </div>
            ))}
        </div>
    )
}