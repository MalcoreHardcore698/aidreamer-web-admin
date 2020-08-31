import React from 'react'
import '../styles/Headline.css'

export default (props) => {
    const Children = props.children

    return (
        <div className="ui-headline">
            {Children}
        </div>
    )
}