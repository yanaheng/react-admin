import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Board } from './board'
import { observe } from './game'

const containerStyle = {
  width: 500,
  height: 500,
  border: '1px solid gray',
}

export default () => {
  const [knightPos, setKnightPos] = useState([1, 7])
  // the observe function will return an unsubscribe callback
  useEffect(() => observe((newPos) => setKnightPos(newPos)))

  return (
    <Card>
      <h2>试着拖拽一下这匹“马”吧~</h2>
      <DndProvider backend={HTML5Backend}>
        <div style={containerStyle}>
          <Board knightPosition={knightPos} />
        </div>
      </DndProvider>
    </Card>
  )
}
