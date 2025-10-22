"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Button from "@/components/ui/Button"
import { Clock, Users, Bell, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"

interface DashboardStats {
  activeOrders: number
  assignedTables: number
  notifications: number
  shiftHours: string
  performance: number
}

export function WaiterDashboard() {
  const stats: DashboardStats = {
    activeOrders: 8,
    assignedTables: 6,
    notifications: 3,
    shiftHours: "10:00 - 18:00",
    performance: 92,
  }

  const notifications = [
    { id: 1, message: "Mesa 5 - Plato principal listo", type: "ready", time: "2 min" },
    { id: 2, message: "Mesa 3 - Cliente solicita la cuenta", type: "request", time: "5 min" },
    { id: 3, message: "Mesa 8 - Pedido en preparación", type: "preparing", time: "8 min" },
  ]

  const recentOrders = [
    { id: "#001", table: "Mesa 5", status: "ready", items: 3, total: "$45.50" },
    { id: "#002", table: "Mesa 3", status: "preparing", items: 2, total: "$28.00" },
    { id: "#003", table: "Mesa 8", status: "pending", items: 4, total: "$67.25" },
  ]

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard del Mesero</h1>
        <Badge variant="outline" className="text-sm">
          <Clock className="w-4 h-4 mr-1" />
          {stats.shiftHours}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Pedidos Activos</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Mesas Asignadas</p>
                <p className="text-2xl font-bold text-foreground">{stats.assignedTables}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Notificaciones</p>
                <p className="text-2xl font-bold text-foreground">{stats.notifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-chart-1" />
              <div>
                <p className="text-sm text-muted-foreground">Desempeño</p>
                <p className="text-2xl font-bold text-foreground">{stats.performance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificaciones de Cocina
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  {notification.type === "ready" && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {notification.type === "request" && <AlertCircle className="w-4 h-4 text-amber-600" />}
                  {notification.type === "preparing" && <Clock className="w-4 h-4 text-blue-600" />}
                  <div>
                    <p className="text-sm font-medium text-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">Hace {notification.time}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Ver
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {order.id} - {order.table}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.items} items • {order.total}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`
                    ${order.status === "ready" ? "status-ready" : ""}
                    ${order.status === "preparing" ? "status-preparing" : ""}
                    ${order.status === "pending" ? "status-pending" : ""}
                  `}
                >
                  {order.status === "ready" && "Listo"}
                  {order.status === "preparing" && "Preparando"}
                  {order.status === "pending" && "Pendiente"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
