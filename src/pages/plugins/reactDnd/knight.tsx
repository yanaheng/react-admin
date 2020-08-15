import React from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import { ItemTypes } from './itemTypes'
import { knightImage } from './knightImage'

const knightStyle: React.CSSProperties = {
  fontSize: 40,
  fontWeight: 'bold',
  cursor: 'move',
}

// 棋盘中的棋子“马”
export const Knight: React.FC = () => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.KNIGHT },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <>
      <DragPreviewImage connect={preview} src={knightImage} />
      <div
        ref={drag}
        style={{
          ...knightStyle,
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        ♘
      </div>
    </>
  )
}
