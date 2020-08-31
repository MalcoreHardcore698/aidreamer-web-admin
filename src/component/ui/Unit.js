import React from 'react'
import CounterBadge from './CounterBadge'
import '../styles/Unit.css'

export default ({ options }) => {
    const {
        unit,
        active,
        handler
    } = options || {}

    return (
        <div className={`ui-unit${(unit?.id === active?.id) ? ' active' : ''}`} onClick={handler}>
            <div className="image">
                <img src={unit.img} alt={unit.name} />
            </div>

            <div className="content">
                <p className="name">{unit.name}</p>
                <p className="legend">{unit.legend}</p>
            </div>
            
            {(unit.count && unit.count > 0) &&
                <CounterBadge options={{
                    type: (unit.count > 9) ? 'circle' : '',
                    color: 'white',
                    background: 'var(--color-graydark)',
                    count: unit.count
                }} />
            }
        </div>
    )
}