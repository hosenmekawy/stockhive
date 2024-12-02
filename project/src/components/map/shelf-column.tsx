import { Shelf, ShelfStatus } from "./shelf"

interface ShelfColumnProps {
  slots: ShelfStatus[]
  columnNumber: number
  onSlotClick?: (position: number) => void
}

export function ShelfColumn({ slots, columnNumber, onSlotClick }: ShelfColumnProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="text-center text-sm font-medium text-gray-600 mb-2">
        {columnNumber}
      </div>
      {slots.map((status, index) => (
        <Shelf
          key={index}
          status={status}
          position={index}
          onClick={() => onSlotClick?.(index)}
        />
      ))}
    </div>
  )
}