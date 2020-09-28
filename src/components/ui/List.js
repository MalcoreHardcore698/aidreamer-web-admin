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
        type,
        state={},
        handler,
        handlerItem,
    } = props.options || {}

    const classes = [
        'ui-list', type,
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
                    className={`ui-item${
                        ((state.id === item.id) || item._condition) ? ' checked' : ''
                    }`}
                    onClick={() => (handlerItem) ? handlerItem(item) : null}
                >
                    <Children item={item} />
                </div>
            ))}
        </div>
    )
}