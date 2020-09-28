import React from 'react'
import '../styles/Frame.css'

export default ({ value, legend }) => (
    <div className="ui-frame">
        <h2 className="value">{value}</h2>
        <p className="legend">{legend}</p>
    </div>
)