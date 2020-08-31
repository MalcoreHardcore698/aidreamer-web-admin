/*
 * COMPONENT: Grid
 * 
 * MISSION: ...
 *
**/

import React from 'react'
// eslint-disable-next-line
import Konva from 'konva'
import {
  Stage, Layer, Group, Rect, Text
} from 'react-konva'
import '../styles/Grid.css'
import Match from './Match'

const width = window.innerWidth
const height = window.innerHeight

const widthMatch = 260 

// Описать объект встреч, определение пути объекта в графе
// Готово формирование графа
// 8 9 10 16
function brackets(p) {
  const result = []

  let c = p
  let r = 1

  while (c > 0) {
    let t = []

    for (let i = 0; i < c; i++)
      t.push(i)
    result.push(t)

    r = r * 2
    c = c - r
  }

  return result
}

function alignment(p, c, i, j) {
  const calc = (t, d) => (i * i * t) + (i * j) * d
  if (i === 4) return calc(45, 0)
  if (i === 3) return calc(37, 222)
  if (i === 2) return calc(36, 143)
  if (i === 1) return calc(50, 95)
  return 0
}

global.brackets = brackets

export default () => {
  const participants = brackets(4)

  const handlerMouseEnter = (e) => {
    const stage = e.target.getStage()
    stage.container().style.cursor = 'grab'
  }

  const handlerDragStart = (e) => {
    const stage = e.target.getStage()
    stage.container().style.cursor = 'grabbing'
  }

  const handlerDragEnd = (e) => {
    
    const stage = e.target.getStage()
    stage.container().style.cursor = 'grab'
  }

  return (
    <div className="ui-grid">
      <Stage
        width={width}
        height={height}
        onMouseEnter={handlerMouseEnter}
        onDragStart={handlerDragStart}
        onDragEnd={handlerDragEnd}
        draggable
      >
        <Layer>
          <Group
            x={width / 2 - (3 * 260 + 50) / 2}
            y={height / 2 - (4 * 80 + 45) / 2}
          >
            {participants.map((column, i) =>
              <Group key={i}>
                <Rect
                  x={widthMatch * i + (i > 0 ? 35 * i : 0)}
                  y={-20}
                  width={widthMatch}
                  height={1}
                  fill="rgba(0,0,0,0.075)"
                />
        
                <Text
                  x={widthMatch * i + (i > 0 ? 35 * i : 0)}
                  y={-55}
                  width={widthMatch}
                  height={40}
                  text={`Раунд ${i + 1}`}
                  align="center"
                  verticalAlign="middle"
                  fill="rgba(0,0,0,0.15)"
                  fontSize={16}
                  fontFamily="sans-serif"
                />

                {column.map((match, j) =>
                  (j % 2 === 0) ?
                    <Match
                      key={j}
                      match={match}
                      x={295 * i}
                      y={95 * j + alignment(participants[(i > 0) ? (i - 1) : 0], column, i, j)}
                      extension={47.5 * i}
                      rupture={(column.length === 1)}
                      top
                    /> :
                    <Match
                      key={j}
                      match={match}
                      x={295 * i}
                      y={95 * j + alignment(participants[(i > 0) ? (i - 1) : 0], column, i, j)}
                      extension={47.5 * i}
                      rupture={(column.length === 1)}
                      bottom
                    />
                )}
              </Group>
            )}
          </Group>
        </Layer>
      </Stage>
    </div>
  )
}