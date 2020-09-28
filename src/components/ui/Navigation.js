import React from 'react'
import '../styles/Navigation.css'

const Block = ({ children }) =>
    <div className="block">{children}</div>

export default ({ options }) => {
    const {
        left,
        right,
        dashboard,
        axis
    } = options

    const classes = [
        'ui-navigation',
        (dashboard) ? 'dashboard' : '',
        axis
    ]

    const render = list => {
        return list.map((item, key) =>
            <React.Fragment key={key}>
                {item}
            </React.Fragment>
        )
    }

    return (
        <div className={classes.join(' ')}>
            <Block>{render(left)}</Block>
            <Block>{render(right)}</Block>
        </div>
    )
}