"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import  Button  from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Check, Clock, ChefHat, Truck, Search, Filter } from "lucide-react"

interface Order {
  id: string
  tableNumber: number
  status: "pending" | "preparing" | "ready" | "delivered"
  items: OrderItem[]
  total: number
  timestamp: string
  notes?: string
}

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  notes?: string
}

interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  available: boolean
}

export function WaiterOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      tableNumber: 5,
      status: "ready",
      items: [
        { id: "1", name: "Pasta Carbonara", quantity: 1, price: 18.5 },
        { id: "2", name: "Ensalada César", quantity: 1, price: 12.0 },
      ],
      total: 30.5,
      timestamp: "14:30",
      notes: "Sin cebolla en la ensalada",
    },
    {
      id: "ORD-002",
      tableNumber: 3,
      status: "preparing",
      items: [
        { id: "3", name: "Hamburguesa Clásica", quantity: 2, price: 15.0 },
        { id: "4", name: "Papas Fritas", quantity: 1, price: 8.0 },
      ],
      total: 38.0,
      timestamp: "14:45",
    },
    {
      id: "ORD-003",
      tableNumber: 8,
      status: "pending",
      items: [
        { id: "5", name: "Pizza Margherita", quantity: 1, price: 16.0 },
        { id: "6", name: "Bebida Cola", quantity: 2, price: 3.5 },
      ],
      total: 23.0,
      timestamp: "15:00",
    },
  ])

  const [selectedTable, setSelectedTable] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const menuItems: MenuItem[] = [
    { id: "1", name: "Pasta Carbonara", category: "Platos Principales", price: 18.5, available: true },
    { id: "2", name: "Ensalada César", category: "Ensaladas", price: 12.0, available: true },
    { id: "3", name: "Hamburguesa Clásica", category: "Platos Principales", price: 15.0, available: true },
    { id: "4", name: "Pizza Margherita", category: "Pizzas", price: 16.0, available: true },
    { id: "5", name: "Papas Fritas", category: "Acompañamientos", price: 8.0, available: true },
    { id: "6", name: "Bebida Cola", category: "Bebidas", price: 3.5, available: true },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.tableNumber.toString().includes(searchTerm)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "preparing":
        return <ChefHat className="w-4 h-4" />
      case "ready":
        return <Check className="w-4 h-4" />
      case "delivered":
        return <Truck className="w-4 h-4" />
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "preparing":
        return "Preparando"
      case "ready":
        return "Listo"
      case "delivered":
        return "Entregado"
    }
  }

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Gestión de Pedidos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Pedido</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="table">Mesa</Label>
                  <Select value={selectedTable} onValueChange={setSelectedTable}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar mesa" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          Mesa {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notas especiales</Label>
                  <Textarea placeholder="Instrucciones especiales..." className="h-10" />
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Seleccionar Platos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <p className="text-sm font-semibold text-primary">${item.price}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-primary text-primary-foreground">Crear Pedido</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por ID o mesa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="preparing">Preparando</SelectItem>
            <SelectItem value="ready">Listos</SelectItem>
            <SelectItem value="delivered">Entregados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Pedidos Activos</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {filteredOrders
              .filter((order) => order.status !== "delivered")
              .map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <Badge variant="outline" className="text-sm">
                          Mesa {order.tableNumber}
                        </Badge>
                        <Badge
                          className={`
                          ${order.status === "ready" ? "status-ready" : ""}
                          ${order.status === "preparing" ? "status-preparing" : ""}
                          ${order.status === "pending" ? "status-pending" : ""}
                        `}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{getStatusText(order.status)}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{order.timestamp}</span>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="text-foreground">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="font-medium text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {order.notes && (
                        <div className="p-2 bg-muted rounded text-sm">
                          <strong>Notas:</strong> {order.notes}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="font-semibold text-lg text-foreground">Total: ${order.total.toFixed(2)}</span>
                        <div className="flex space-x-2">
                          {order.status === "ready" && (
                            <Button
                              size="sm"
                              className="bg-primary text-primary-foreground"
                              onClick={() => updateOrderStatus(order.id, "delivered")}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Confirmar Entrega
                            </Button>
                          )}
                          {order.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, "preparing")}
                            >
                              Enviar a Cocina
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="grid gap-4">
            {filteredOrders
              .filter((order) => order.status === "delivered")
              .map((order) => (
                <Card key={order.id} className="opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <Badge variant="outline">Mesa {order.tableNumber}</Badge>
                        <Badge className="status-delivered">
                          <Truck className="w-4 h-4 mr-1" />
                          Entregado
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{order.timestamp}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{order.items.length} items</span>
                      <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
