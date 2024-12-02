import { cn } from "@/lib/utils"

export type ShelfStatus = "empty" | "loaded" | "shipment"

interface ShelfProps {
  status: ShelfStatus
  position: number
  onClick?: () => void
}

export function Shelf({ status, position, onClick }: ShelfProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full h-8 border border-gray-200 cursor-pointer transition-colors",
        status === "empty" && "bg-gray-100",
        status === "loaded" && "bg-blue-100",
        status === "shipment" && "bg-blue-900"
      )}
      title={`Shelf ${position}: ${status}`}
    />
  )
}