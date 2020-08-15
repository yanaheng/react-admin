import React from 'react'
import { useDrop } from 'react-dnd'
import { Square } from './square'
import { canMoveKnight, moveKnight } from './game'
import { ItemTypes } from './itemTypes'
import { Overlay } from './overLay'

// 棋盘格子参数、棋子是否可以落下的提示
export interface BoardSquareProps {
  x: number
  y: number
  children: any
}

export const BoardSquare: React.FC<BoardSquareProps> = ({
  x,
  y,
  children,
}: BoardSquareProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    canDrop: () => canMoveKnight(x, y),
    drop: () => moveKnight(x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })
  const black = (x + y) % 2 === 1

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
      {isOver && canDrop && <Overlay color="green" />}
    </div>
  )
}
