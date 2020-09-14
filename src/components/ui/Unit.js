import React from 'react'
import CounterBadge from './CounterBadge'
import Avatar from './Avatar'
import '../styles/Unit.css'

export default ({ options }) => {
    const {
        unit,
        active,
        handler
    } = options || {}

    return (
        <div className={`ui-unit${(unit?.id === active?.id) ? ' active' : ''}`} onClick={handler}>
            <Avatar avatar={unit.img} properties={['circle']} />

            <div className="content">
                <p className="name">{unit.name}</p>
                <p className="legend">{unit.legend}</p>
            </div>
            
            {(unit.count && unit.count > 0) &&
                <CounterBadge options={{
                    type: (unit.count > 9) ? 'circle' : '',
                    background: 'var(--color-graydark)',
                    color: 'white',
                    count: unit.count
                }} />
            }
        </div>
    )
}