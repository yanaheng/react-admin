import React from 'react'
import { BoardSquare } from './boardSquare'
import { Knight } from './knight'

export interface BoardProps {
  knightPosition: [number, number]
}

/** 棋盘面板样式 */
const boardStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
}
/** 棋盘格子样式 */
const squareStyle: React.CSSProperties = { width: '12.5%', height: '12.5%' }

/**
 * 棋盘面板
 * @param props 
 */
export const Board: React.FC<BoardProps> = ({
  knightPosition: [knightX, knightY],
}) => {
  function renderSquare(i: number) {
    const x = i % 8
    const y = Math.floor(i / 8)

    return (
      <div key={i} style={squareStyle}>
        <BoardSquare x={x} y={y}>
          {renderPiece(x, y)}
        </BoardSquare>
      </div>
    )
  }
  function renderPiece(x: number, y: number) {
    const isKnightHere = x === knightX && y === knightY
    return isKnightHere ? <Knight /> : null
  }

  const squares = []
  for (let i = 0; i < 64; i += 1) {
    squares.push(renderSquare(i))
  }
  return <div style={boardStyle}>{squares}</div>
}
