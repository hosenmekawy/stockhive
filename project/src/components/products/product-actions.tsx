import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function ProductActions() {
  return (
    <div className="flex gap-2">
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>
  )
}