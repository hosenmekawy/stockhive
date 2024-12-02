import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

interface ReportCardProps {
  title: string
  description: string
  onExportCSV: () => void
  onExportPDF: () => void
  children: React.ReactNode
}

export function ReportCard({
  title,
  description,
  onExportCSV,
  onExportPDF,
  children
}: ReportCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onExportCSV}>
              <FileDown className="mr-2 h-4 w-4" />
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={onExportPDF}>
              <FileDown className="mr-2 h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}