"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import  Button  from "@/components/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Clock, Calendar, Settings, Plus, Edit } from "lucide-react"

interface Table {
  id: number
  seats: number
  status: "available" | "occupied" | "reserved"
  assignedWaiter?: string
  currentOrder?: string
  reservationTime?: string
  customerName?: string
  notes?: string
  groupedWith?: number[]
}

interface Reservation {
  id: string
  tableNumber: number
  customerName: string
  customerPhone: string
  date: string
  time: string
  partySize: number
  notes?: string
  status: "confirmed" | "seated" | "completed" | "cancelled"
}

export function WaiterTables() {
  const [tables, setTables] = useState<Table[]>([
    { id: 1, seats: 2, status: "available", assignedWaiter: "Juan" },
    { id: 2, seats: 4, status: "occupied", assignedWaiter: "Juan", currentOrder: "ORD-001" },
    { id: 3, seats: 4, status: "reserved", assignedWaiter: "Juan", reservationTime: "19:00", customerName: "García" },
    { id: 4, seats: 6, status: "available", assignedWaiter: "Juan" },
    { id: 5, seats: 2, status: "occupied", assignedWaiter: "Juan", currentOrder: "ORD-002" },
    { id: 6, seats: 8, status: "available", assignedWaiter: "Juan" },
    { id: 7, seats: 4, status: "available", assignedWaiter: "María" },
    { id: 8, seats: 4, status: "occupied", assignedWaiter: "Juan", currentOrder: "ORD-003" },
    { id: 9, seats: 2, status: "available", assignedWaiter: "Juan" },
    { id: 10, seats: 6, status: "reserved", assignedWaiter: "Juan", reservationTime: "20:30", customerName: "López" },
  ])

  const [reservations] = useState<Reservation[]>([
    {
      id: "RES-001",
      tableNumber: 3,
      customerName: "García",
      customerPhone: "+34 666 123 456",
      date: "2024-01-15",
      time: "19:00",
      partySize: 4,
      status: "confirmed",
      notes: "Cumpleaños, necesita silla alta para niño",
    },
    {
      id: "RES-002",
      tableNumber: 10,
      customerName: "López",
      customerPhone: "+34 666 789 012",
      date: "2024-01-15",
      time: "20:30",
      partySize: 6,
      status: "confirmed",
    },
  ])

  const [selectedTables, setSelectedTables] = useState<number[]>([])

  const updateTableStatus = (tableId: number, newStatus: Table["status"]) => {
    setTables(tables.map((table) => (table.id === tableId ? { ...table, status: newStatus } : table)))
  }

  const toggleTableSelection = (tableId: number) => {
    setSelectedTables((prev) => (prev.includes(tableId) ? prev.filter((id) => id !== tableId) : [...prev, tableId]))
  }

  const groupTables = () => {
    if (selectedTables.length < 2) return

    setTables(
      tables.map((table) =>
        selectedTables.includes(table.id)
          ? { ...table, groupedWith: selectedTables.filter((id) => id !== table.id) }
          : table,
      ),
    )
    setSelectedTables([])
  }

  const getTableStatusColor = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "status-available"
      case "occupied":
        return "status-occupied"
      case "reserved":
        return "status-reserved"
    }
  }

  const getStatusText = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "Libre"
      case "occupied":
        return "Ocupada"
      case "reserved":
        return "Reservada"
    }
  }

  const getStatusIcon = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return <Users className="w-4 h-4" />
      case "occupied":
        return <Users className="w-4 h-4" />
      case "reserved":
        return <Calendar className="w-4 h-4" />
    }
  }

  const myTables = tables.filter((table) => table.assignedWaiter === "Juan")

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Gestión de Mesas</h1>
        <div className="flex space-x-2">
          {selectedTables.length > 1 && (
            <Button onClick={groupTables} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Agrupar Mesas ({selectedTables.length})
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                <Settings className="w-4 h-4 mr-2" />
                Configurar Mesa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurar Mesa</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Mesa</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar mesa" />
                    </SelectTrigger>
                    <SelectContent>
                      {myTables.map((table) => (
                        <SelectItem key={table.id} value={table.id.toString()}>
                          Mesa {table.id} ({table.seats} asientos)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Estado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Cambiar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Libre</SelectItem>
                      <SelectItem value="occupied">Ocupada</SelectItem>
                      <SelectItem value="reserved">Reservada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Notas</Label>
                  <Textarea placeholder="Notas especiales sobre la mesa..." />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button className="bg-primary text-primary-foreground">Guardar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="layout" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="layout">Mapa de Mesas</TabsTrigger>
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="space-y-6">
          {/* Table Status Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mesas Libres</p>
                    <p className="text-xl font-bold text-foreground">
                      {myTables.filter((t) => t.status === "available").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mesas Ocupadas</p>
                    <p className="text-xl font-bold text-foreground">
                      {myTables.filter((t) => t.status === "occupied").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mesas Reservadas</p>
                    <p className="text-xl font-bold text-foreground">
                      {myTables.filter((t) => t.status === "reserved").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {myTables.map((table) => (
              <Card
                key={table.id}
                className={`
                  cursor-pointer transition-all hover:shadow-md
                  ${selectedTables.includes(table.id) ? "ring-2 ring-primary" : ""}
                  ${table.groupedWith && table.groupedWith.length > 0 ? "border-dashed border-2 border-secondary" : ""}
                `}
                onClick={() => toggleTableSelection(table.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Mesa {table.id}</CardTitle>
                    <Badge className={getTableStatusColor(table.status)}>
                      {getStatusIcon(table.status)}
                      <span className="ml-1">{getStatusText(table.status)}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    {table.seats} asientos
                  </div>

                  {table.status === "occupied" && table.currentOrder && (
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Pedido: </span>
                      <span className="text-primary">{table.currentOrder}</span>
                    </div>
                  )}

                  {table.status === "reserved" && (
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-foreground">{table.reservationTime}</span>
                      </div>
                      {table.customerName && (
                        <div className="text-sm">
                          <span className="font-medium text-foreground">{table.customerName}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {table.groupedWith && table.groupedWith.length > 0 && (
                    <div className="text-xs text-secondary">Agrupada con: {table.groupedWith.join(", ")}</div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <Select
                      value={table.status}
                      onValueChange={(value) => updateTableStatus(table.id, value as Table["status"])}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Libre</SelectItem>
                        <SelectItem value="occupied">Ocupada</SelectItem>
                        <SelectItem value="reserved">Reservada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reservations" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Reservas Activas</h2>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Reserva
            </Button>
          </div>

          <div className="grid gap-4">
            {reservations
              .filter((res) => res.status !== "completed")
              .map((reservation) => (
                <Card key={reservation.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-lg">{reservation.id}</CardTitle>
                        <Badge variant="outline">Mesa {reservation.tableNumber}</Badge>
                        <Badge
                          className={`
                          ${reservation.status === "confirmed" ? "status-reserved" : ""}
                          ${reservation.status === "seated" ? "status-occupied" : ""}
                        `}
                        >
                          {reservation.status === "confirmed" && "Confirmada"}
                          {reservation.status === "seated" && "Sentados"}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Cliente</p>
                        <p className="font-medium text-foreground">{reservation.customerName}</p>
                        <p className="text-sm text-muted-foreground">{reservation.customerPhone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fecha y Hora</p>
                        <p className="font-medium text-foreground">{reservation.date}</p>
                        <p className="text-sm text-foreground">{reservation.time}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Personas</p>
                      <p className="font-medium text-foreground">{reservation.partySize} personas</p>
                    </div>

                    {reservation.notes && (
                      <div className="p-2 bg-muted rounded text-sm">
                        <strong>Notas:</strong> {reservation.notes}
                      </div>
                    )}

                    <div className="flex justify-end space-x-2 pt-2">
                      {reservation.status === "confirmed" && (
                        <Button size="sm" className="bg-primary text-primary-foreground">
                          <Users className="w-4 h-4 mr-1" />
                          Sentar Clientes
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Contactar
                      </Button>
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
