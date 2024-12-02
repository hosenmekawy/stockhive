import { WarehouseMap } from "@/components/map/warehouse-map"

export function Map() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Facility Map</h1>
      <WarehouseMap />
    </div>
  )
}