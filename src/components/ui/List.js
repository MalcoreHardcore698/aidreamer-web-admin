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
        handler,
        handlerList
    } = props.options || {}

    return (
        <div
            className={`ui-list${(handlerList) ? ' clickable' : ''}`}
            onClick={handlerList}
        >
            {list.map((item, key) =>
                <div
                    key={key}
                    className="ui-item"
                    onClick={() => handler(item)}
                >
                    <Children item={item} />
                </div>
            )}
        </div>
    )
}