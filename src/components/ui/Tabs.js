import React from 'react'
import '../styles/Tabs.css'

export default ({ options }) => {
    const {
        type,
        tabs,
        state,
        handler
    } = options || {}

    const classes = [
        'ui-tabs',
        type
    ]

    return (
        <div className={classes.join(' ')}>
            <ul className="list">
                {tabs.map((tab, key) => (
                    <li
                        key={key}
                        className={`item${(state.id === tab.id) ? ' active' : ''}`}
                        onClick={handler}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
            <div className="underline"></div>
        </div>
    )
}