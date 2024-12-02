import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportCard } from "@/components/reports/report-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { exportToCSV, exportToPDF } from "@/lib/export-utils"

// Sample data
const inventoryData = [
  { id: 1, name: "Product A", category: "Electronics", quantity: 50, status: "In Stock" },
  { id: 2, name: "Product B", category: "Office", quantity: 30, status: "Low Stock" },
  { id: 3, name: "Product C", category: "Furniture", quantity: 15, status: "Critical" },
]

const movementData = [
  { id: 1, date: "2023-11-01", type: "Inbound", quantity: 100, product: "Product A" },
  { id: 2, date: "2023-11-02", type: "Outbound", quantity: 50, product: "Product B" },
  { id: 3, date: "2023-11-03", type: "Inbound", quantity: 75, product: "Product C" },
]

const alertsData = [
  { id: 1, date: "2023-11-01", type: "Low Stock", product: "Product A", status: "Active" },
  { id: 2, date: "2023-11-02", type: "Space Full", section: "Section-5", status: "Resolved" },
  { id: 3, date: "2023-11-03", type: "Missing Item", product: "Product C", status: "Active" },
]

export function Reports() {
  const [activeTab, setActiveTab] = useState("inventory")

  const handleExportInventoryCSV = () => {
    exportToCSV(inventoryData, 'inventory-report')
  }

  const handleExportInventoryPDF = () => {
    exportToPDF(
      inventoryData,
      'inventory-report',
      'Inventory Report',
      ['Name', 'Category', 'Quantity', 'Status']
    )
  }

  const handleExportMovementCSV = () => {
    exportToCSV(movementData, 'movement-report')
  }

  const handleExportMovementPDF = () => {
    exportToPDF(
      movementData,
      'movement-report',
      'Movement Report',
      ['Date', 'Type', 'Quantity', 'Product']
    )
  }

  const handleExportAlertsCSV = () => {
    exportToCSV(alertsData, 'alerts-report')
  }

  const handleExportAlertsPDF = () => {
    exportToPDF(
      alertsData,
      'alerts-report',
      'Alerts Report',
      ['Date', 'Type', 'Product', 'Status']
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="inventory">Inventory Report</TabsTrigger>
          <TabsTrigger value="movement">Movement Report</TabsTrigger>
          <TabsTrigger value="alerts">Alerts Report</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <ReportCard
            title="Current Inventory Status"
            description="Overview of all items in stock with their current status"
            onExportCSV={handleExportInventoryCSV}
            onExportPDF={handleExportInventoryPDF}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ReportCard>
        </TabsContent>

        <TabsContent value="movement" className="space-y-4">
          <ReportCard
            title="Stock Movement History"
            description="Track inbound and outbound movement of items"
            onExportCSV={handleExportMovementCSV}
            onExportPDF={handleExportMovementPDF}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Product</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movementData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.product}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ReportCard>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <ReportCard
            title="System Alerts"
            description="History of system alerts and their current status"
            onExportCSV={handleExportAlertsCSV}
            onExportPDF={handleExportAlertsPDF}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Product/Section</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alertsData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.product || item.section}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ReportCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}