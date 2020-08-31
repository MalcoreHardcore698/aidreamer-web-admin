/*
 * COMPONENT: Participant
 * 
 * MISSION: ...
 *
**/

import React, { useState } from 'react'
import { Group, Text, Rect } from 'react-konva'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrophy } from '@fortawesome/free-solid-svg-icons'

export default ({ participant, top }) => {
    const [highlighted, setHighlighted] = useState('white')
    
    const handlerMouseEnter = (e) => {
        setHighlighted('#f3f3f3')
        const stage = e.target.getStage()
        stage.container().style.cursor = 'pointer'
    }

    const handlerMouseLeave = (e) => {
        setHighlighted('white')
        const stage = e.target.getStage()
        stage.container().style.cursor = 'grab'
    }

    return (
        <Group x={0} y={(top) ? 0 : 40} onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave}>
            <Rect
                width={260}
                height={40}
                cornerRadius={(top) ? [5, 5, 0, 0] : [0, 0, 5, 5]}
                fill={`${highlighted}`}
            />
            <Rect
                width={35}
                height={40}
                cornerRadius={(top) ? [5, 0, 0, 0] : [0, 0, 0, 5]}
                fill="rgba(0,0,0,0.075)"
            />
            <Text
                x={0}
                y={0}
                width={35}
                height={40}
                text={participant}
                align="center"
                verticalAlign="middle"
                fill="rgba(0,0,0,0.35)"
                fontSize={16}
                fontFamily="sans-serif"
            />
            <Text
                x={50}
                y={0}
                width={180}
                height={40}
                text="Malcore"
                verticalAlign="middle"
                fill="#333333"
                fontSize={16}
                fontFamily="sans-serif"
            />
            <Text
                x={220}
                y={0}
                width={35}
                height={40}
                text="2"
                align="center"
                verticalAlign="middle"
                fill="#333333"
                fontSize={16}
                fontFamily="sans-serif"
            />
        </Group>
    )
}