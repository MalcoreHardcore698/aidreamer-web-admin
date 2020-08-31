import React, { useState } from 'react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import '../styles/Slider.css'

export default ({ type, options }) => {
    const [scalableSpan, setScalableSpan] = useState(false)

    const classes = [
        'ui-slider',
        (scalableSpan) ? 'scalable' : 'not'
    ]

    const handlerBeforeChange = (e) => {
        setScalableSpan(true)
    }

    return (
        <div className={classes.join(' ')}>
            {(type === 'range')
                ? <Range onBeforeChange={handlerBeforeChange} {...options} />
                : <Slider onBeforeChange={handlerBeforeChange} {...options} />
            }
        </div>
    )
}