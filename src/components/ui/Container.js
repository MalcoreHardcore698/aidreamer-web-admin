import React from 'react'
import '../styles/Container.css'

export default (props) => {
    const Children = props.children
    
    const classes = [
        'ui-container', props.type,
        (props.clear) ? 'clear' : '',
        (props.sticky) ? 'sticky' : ''
    ]

    return (
        <div className={classes.join(' ')}>
            {Children}
        </div>
    )
}