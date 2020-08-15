let knightPosition: [number, number] = [1, 7]
let observers: PositionObserver[] = []
export type PositionObserver = ((position: [number, number]) => void) | null

function emitChange() {
  observers.forEach((o) => o && o(knightPosition))
}

export function observe(o: PositionObserver): () => void {
  observers.push(o)
  emitChange()

  return (): void => {
    observers = observers.filter((t) => t !== o)
  }
}

export function canMoveKnight(toX: number, toY: number): boolean {
  const [x, y] = knightPosition
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}

export function moveKnight(toX: number, toY: number): void {
  knightPosition = [toX, toY]
  emitChange()
}
