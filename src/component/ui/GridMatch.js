/*
 * COMPONENT: Match
 * 
 * MISSION: ...
 *
**/

import React from 'react'
import { Group, Rect, Line } from 'react-konva'
import Participant from './Participant'

export default ({ match, x=0, y=0, top, bottom, extension, rupture }) => {
    return (
        <Group x={x} y={y}>
            {(top && !rupture) &&
            <Line
                x={0}
                y={0}
                points={[265, 40, 275, 40, 275, extension + 87.5, 285, extension + 87.5]}
                stroke="rgba(0,0,0,0.075)"
                strokeWidth={2}
                lineCap='round'
                lineJoin='round'
            />}
            {(bottom && !rupture) &&
            <Line
                x={0}
                y={0}
                points={[265, 40, 275, 40, 275, -7.5 - extension, 285, -7.5 - extension]}
                stroke="rgba(0,0,0,0.075)"
                strokeWidth={2}
                lineCap='round'
                lineJoin='round'
            />}
            <Rect
                width={260}
                height={80}
                strokeWidth={1}
                stroke="rgba(0,0,0,0.045)"
                cornerRadius={5}
                fill='white'
            />
            <Rect
                x={0}
                y={40}
                width={260}
                height={1}
                fill="rgba(0,0,0,0.045)"
            />
            <Participant participant={match[0]} top />
            <Participant participant={match[1]} bottom />

            <Line
                y={40}
                points={[0, 0, 260, 0]}
                stroke="rgba(0,0,0,0.095)"
                strokeWidth={1}
                lineCap='round'
                lineJoin='round'
            />
        </Group>
    )
}