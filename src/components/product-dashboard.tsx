import React, { useState, useRef,  } from "react"
import Image from "next/image"
import { Plus, Search, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Navbar } from "./admin-panel/navbar"
import { Card } from "./ui/card"
import AddProductForm from "./forms/add-product"

// Placeholder data
const initialProducts = [
  { id: 1, name: "Laptop", hsnCode: "8471", image: "https://png.pngtree.com/png-clipart/20241009/original/pngtree-seamless-pattern-with-cute-cartoon-bottle-png-image_16254404.png" },
  { id: 2, name: "Smartphone", hsnCode: "8517", image: "https://png.pngtree.com/png-clipart/20241009/original/pngtree-seamless-pattern-with-cute-cartoon-bottle-png-image_16254404.png" },
  { id: 3, name: "Headphones", hsnCode: "8518", image: "https://png.pngtree.com/png-clipart/20241009/original/pngtree-seamless-pattern-with-cute-cartoon-bottle-png-image_16254404.png" },
  { id: 4, name: "Tablet", hsnCode: "8471", image: "https://png.pngtree.com/png-clipart/20241009/original/pngtree-seamless-pattern-with-cute-cartoon-bottle-png-image_16254404.png" },
]

export function ProductDashboardComponent() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [newProduct, setNewProduct] = useState({ name: "", hsnCode: "", image: null })
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.hsnCode.includes(searchTerm)
  )

  const handleImageUpload = (e, isEditing = false) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (isEditing) {
          setEditingProduct({ ...editingProduct, image: reader.result })
        } else {
          setNewProduct({ ...newProduct, image: reader.result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (newProduct.name && newProduct.hsnCode && newProduct.image) {
      setProducts([
        ...products,
        {
          id: products.length + 1,
          name: newProduct.name,
          hsnCode: newProduct.hsnCode,
          image: newProduct.image,
        },
      ])
      setNewProduct({ name: "", hsnCode: "", image: null })
      setIsAddingProduct(false)
    }
  }

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct.name && editingProduct.hsnCode && editingProduct.image) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p))
      setEditingProduct(null)
    }
  }

  const SearchProduct = (
    <div className="relative">
      <Input
        placeholder="Search products or HSN codes"
        value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value)}}
        className="pl-8"
      />
    </div>
  );

  const AddProductButton = (
    <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <AddProductForm />
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="">
      <Navbar title="Product Dashboard" buttons={[AddProductButton, SearchProduct]} />
      <div className="p-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <Sheet key={product.id}>
            <SheetTrigger asChild>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <Card className="rounded">
                  <Image 
                  height={0}
                  width={0}
                  sizes="100vw"
                  src={product.image} alt={product.name}
                  className="w-full h-auto rounded-t"
                  />
                  <div className="p-2">
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm font-semibold text-gray-700">HSN Code: {product.hsnCode}</p>
                  </div>
                </Card>
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Product</SheetTitle>
              </SheetHeader>
              <form onSubmit={handleEditProduct} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor={`edit-name-${product.id}`}>Product Name</Label>
                  <Input
                    id={`edit-name-${product.id}`}
                    value={editingProduct?.name ?? product.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`edit-hsnCode-${product.id}`}>HSN Code</Label>
                  <Input
                    id={`edit-hsnCode-${product.id}`}
                    value={editingProduct?.hsnCode ?? product.hsnCode}
                    onChange={(e) => setEditingProduct({ ...editingProduct, hsnCode: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`edit-image-${product.id}`}>Product Image</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      onClick={() => editFileInputRef.current.click()}
                      variant="outline"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Change Image
                    </Button>
                    <Input
                      id={`edit-image-${product.id}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={editFileInputRef}
                      onChange={(e) => handleImageUpload(e, true)}
                    />
                    {editingProduct?.image && <span className="text-sm text-muted-foreground">New image selected</span>}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="submit" onClick={() => setEditingProduct(product)}>Save Changes</Button>
                  <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="mt-4 text-center text-muted-foreground">No products found.</p>
      )}
    </div>
  )
}