import { Package, AlertTriangle, ArrowDownRight, ArrowUpRight } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { AreaChartComponent } from "@/components/dashboard/area-chart"
import { PieChartComponent } from "@/components/dashboard/pie-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"

export function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Last updated: Just now</span>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Items" 
          value="1,234"
          description="Total items in inventory"
          icon={<Package className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Low Stock Items" 
          value="23"
          description="Items below threshold"
          icon={<AlertTriangle className="h-4 w-4" />}
          className="text-yellow-500"
          trend={{ value: 8, isPositive: false }}
        />
        <StatsCard 
          title="Space Used" 
          value="76%"
          description="Warehouse capacity"
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard 
          title="Active Alerts" 
          value="5"
          description="Requires attention"
          className="text-red-500"
          trend={{ value: 15, isPositive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AreaChartComponent />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PieChartComponent />
        <BarChartComponent />
      </div>
    </div>
  )
}