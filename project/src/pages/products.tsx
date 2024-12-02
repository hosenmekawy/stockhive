import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductList } from "@/components/products/product-list"
import { ProductActions } from "@/components/products/product-actions"
import { Product } from "@/types/product"

export function Products() {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Product A",
      category: "Electronics",
      quantity: 50,
      location: "Section-1",
      status: "In Stock",
    },
    {
      id: "2",
      name: "Product B",
      category: "Office Supplies",
      quantity: 100,
      location: "Section-2",
      status: "Low Stock",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <ProductActions />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductList products={products} />
        </CardContent>
      </Card>
    </div>
  )
}