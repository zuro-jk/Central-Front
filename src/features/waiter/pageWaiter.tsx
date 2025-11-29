"use client";

import { WaiterDashboard } from "@/components/OnlyWaiter/dashboard";
import { WaiterOrders } from "@/components/OnlyWaiter/orders";
import { WaiterTables } from "@/components/OnlyWaiter/tables";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/core/stores/auth/auth.store";
import {
  Bell,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

type ActiveSection = "dashboard" | "orders" | "tables";

export default function WaiterApp() {
  const { logout } = useAuthStore();

  const [activeSection, setActiveSection] =
    useState<ActiveSection>("dashboard");
  const [notifications] = useState(3);

  const navigationItems = [
    {
      id: "dashboard" as ActiveSection,
      label: "Dashboard",
      icon: LayoutDashboard,
      component: WaiterDashboard,
    },
    {
      id: "orders" as ActiveSection,
      label: "Pedidos",
      icon: ClipboardList,
      component: WaiterOrders,
    },
    {
      id: "tables" as ActiveSection,
      label: "Mesas",
      icon: Users,
      component: WaiterTables,
    },
  ];

  const ActiveComponent =
    navigationItems.find((item) => item.id === activeSection)?.component ||
    WaiterDashboard;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Juan Pérez</p>
              <p className="text-sm text-muted-foreground">Mesero</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="relative bg-transparent"
            >
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-card border-r border-border">
            {/* Profile Section */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Juan Pérez</p>
                  <p className="text-sm text-muted-foreground">Mesero</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "primary" : "ghost"}
                    className={`
                      w-full justify-start h-12 text-left
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "text-foreground hover:bg-muted"
                      }
                    `}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                    {item.id === "dashboard" && notifications > 0 && (
                      <Badge className="ml-auto w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <Bell className="w-4 h-4 mr-3" />
                Notificaciones
                {notifications > 0 && (
                  <Badge className="ml-auto w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <main className="min-h-screen">
            <ActiveComponent />
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="grid grid-cols-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`
                  h-16 rounded-none flex-col space-y-1 relative
                  ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }
                `}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
                {item.id === "dashboard" && notifications > 0 && (
                  <Badge className="absolute top-2 right-4 w-4 h-4 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                    {notifications}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
}
