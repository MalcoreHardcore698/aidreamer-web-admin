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

    const classesToggle = (target) => [
        'toggle',
        (target?.classNames),
        (target.type === state) ? ' active' : ''
    ]

    const handlerState = (target) => {
        if (target === 'erase')
            return null
        handler(target)
    }

    return (
        <div className={classes.join(' ')}>
            {targets.filter(t => t).map((target, key) =>
                <div
                    key={key}
                    className={classesToggle(target).join(' ')}
                    onClick={() => handlerState(target.type)}
                >
                    {target.value}
                </div>    
            )}
            {(!targets || targets.length === 0) && <Message text="No Content" />}
        </div>
    )
}