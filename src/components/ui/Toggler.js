/*
 * COMPONENT: Toggler
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import Message from './Message'
import '../styles/Toggler.css'

export default ({ options }) => {
    const {
        type,
        state=null,
        handler=null,
        targets=[]
    } = options || {}

    const classes = [
        'ui-toggler',
        type
    ]

    const handlerState = (target) => {
        handler(target)
    }

    return (
        <div className={classes.join(' ')}>
            {targets.map((target, key) =>
                <div
                    key={key}
                    className={`toggle${(target.type === state) ? ' active' : ''}`}
                    onClick={() => handlerState(target.type)}
                >
                    {target.value}
                </div>    
            )}
            {(!targets || targets.length === 0) && <Message text="No Content" />}
        </div>
    )
}