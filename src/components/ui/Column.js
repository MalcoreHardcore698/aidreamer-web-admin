import React from 'react'
import '../styles/Column.css'

export default (props) => {
    const Children = props.children

    const classes = [
        'ui-column',
        (props.center) ? 'center' : ''
    ]

    return (
        <div className={classes.join(' ')}>
            {Children}
        </div>
    )
}