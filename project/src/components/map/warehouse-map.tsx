import { useState } from "react"
import { ShelfColumn } from "./shelf-column"
import { ShelfStatus } from "./shelf"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

// Generate initial shelf data
const generateShelfData = () => {
  const statuses: ShelfStatus[] = ["empty", "loaded", "shipment"]
  return Array.from({ length: 10 }, () =>
    Array.from({ length: 12 }, () =>
      statuses[Math.floor(Math.random() * 3)]
    )
  )
}

export function WarehouseMap() {
  const [shelfData, setShelfData] = useState(generateShelfData())
  const { toast } = useToast()

  const handleSlotClick = (column: number, position: number) => {
    const status = shelfData[column][position]
    toast({
      title: "Shelf Information",
      description: `Column ${column + 1}, Position ${position + 1}: ${status}`,
    })
  }

  // Calculate statistics
  const calculateStats = () => {
    let empty = 0
    let loaded = 0
    let shipment = 0
    let total = 0

    shelfData.forEach(column => {
      column.forEach(status => {
        total++
        if (status === "empty") empty++
        if (status === "loaded") loaded++
        if (status === "shipment") shipment++
      })
    })

    return {
      empty: Math.round((empty / total) * 100),
      loaded: Math.round((loaded / total) * 100),
      shipment: Math.round((shipment / total) * 100),
      spaceUsed: Math.round(((loaded + shipment) / total) * 100)
    }
  }

  const stats = calculateStats()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Space Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.spaceUsed}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Empty Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-500">{stats.empty}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Loaded Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.loaded}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Shipment Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.shipment}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Warehouse Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 overflow-x-auto p-4">
            {shelfData.map((column, columnIndex) => (
              <ShelfColumn
                key={columnIndex}
                slots={column}
                columnNumber={columnIndex + 1}
                onSlotClick={(position) => handleSlotClick(columnIndex, position)}
              />
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-200" />
              <span>Empty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-gray-200" />
              <span>Loaded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-900 border border-gray-200" />
              <span>Shipment</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}