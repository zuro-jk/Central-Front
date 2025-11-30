import { api } from "@/core/api/api";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [productCount, setProductCount] = useState<number | null>(null);
  const [ordersTodayTotal, setOrdersTodayTotal] = useState<number | null>(null);
  const [ordersCount, setOrdersCount] = useState<number | null>(null);
  const [usersCount, setUsersCount] = useState<number | null>(null);

  // Contar productos reales desde el backend (GET /api/v1/products)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/api/v1/products");
        const list = (res.data?.data || []) as any[];
        if (mounted) setProductCount(Array.isArray(list) ? list.length : null);
      } catch (_) {
        // silencioso: mantener mock si falla
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Obtener órdenes y calcular ventas de hoy y conteo
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get(
          "/api/v1/orders",
          token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
        );
        const orders = (res.data?.data || []) as Array<{
          total?: number;
          date?: string;
        }>;
        const today = new Date();
        let total = 0;
        let count = 0;
        for (const o of orders) {
          if (!o?.date) continue;
          const d = new Date(o.date as any);
          if (
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()
          ) {
            total += Number(o.total || 0);
          }
          count += 1;
        }
        if (mounted) {
          setOrdersTodayTotal(total);
          setOrdersCount(count);
        }
      } catch (_) {
        // silencioso
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Obtener conteo de usuarios si hay token
  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("access_token");
    if (!token) return;
    (async () => {
      try {
        const res = await api.get("/api/v1/users/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const list = (res.data?.data || []) as any[];
        if (mounted) setUsersCount(Array.isArray(list) ? list.length : null);
      } catch (_) {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Gráfico vacío si no hay datos (se alimentará desde Reports)
  const data = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({ label: `D${i + 1}`, value: 0 })),
    []
  );
  const totals = {
    total: data.reduce((acc, d) => acc + d.value, 0),
    avg: Math.round(data.reduce((acc, d) => acc + d.value, 0) / data.length),
    best: data.reduce((a, b) => (a.value > b.value ? a : b)),
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <nav className="text-sm text-gray-500">
            Admin / <span className="text-gray-700">Dashboard</span>
          </nav>
          <h1 className="mt-1 text-2xl md:text-3xl font-bold text-gray-900">
            Panel de administración
          </h1>
          <p className="text-gray-600 mt-1">
            Resumen de negocio y accesos clave
          </p>
        </div>
        <div className="hidden md:flex gap-2">
          <Link
            to="/admin/reports"
            className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Ver reportes
          </Link>
          <Link
            to="/admin/products"
            className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Nuevo producto
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Ventas (hoy)",
            value:
              ordersTodayTotal !== null
                ? `S/ ${ordersTodayTotal.toFixed(2)}`
                : "—",
            path: "/admin/reports",
          },
          {
            label: "Pedidos activos",
            value: ordersCount !== null ? String(ordersCount) : "—",
            path: "/chef/orders",
          },
          {
            label: "Productos activos",
            value: productCount !== null ? String(productCount) : "—",
            path: "/admin/products",
          },
          {
            label: "Usuarios",
            value: usersCount !== null ? String(usersCount) : "—",
            path: "/admin/users",
          },
        ].map((s) => (
          <Link
            key={s.label}
            to={s.path}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow transition-shadow"
          >
            <div className="text-xs uppercase tracking-wide text-gray-500">
              {s.label}
            </div>
            <div className="text-2xl font-semibold text-gray-900 mt-1">
              {s.value}
            </div>
            <div className="text-red-600 text-sm mt-2">Detalles →</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Ventas recientes
          </h2>
          <Link
            to="/admin/reports"
            className="block mt-4"
          >
            <div className="h-48 rounded-lg bg-gradient-to-b from-red-50 to-amber-50 border border-amber-200 px-3 py-3">
              <div className="h-full flex items-end gap-2">
                {data.map((d, idx) => {
                  const delay = 40 * idx;
                  const h = Math.max(
                    8,
                    Math.min(100, Math.round((d.value / 1000) * 100))
                  );
                  return (
                    <div
                      key={d.label}
                      className="flex-1 group"
                    >
                      <div
                        className="w-full bg-red-300/70 group-hover:bg-red-400 transition-[height,background-color] duration-700 ease-out rounded-md"
                        style={{
                          height: 0,
                          animation: `growBar 800ms ${delay}ms forwards`,
                          ["--bar-h" as any]: `${h}px`,
                        }}
                        aria-label={`${d.label}: S/ ${d.value}`}
                        title={`${d.label}: S/ ${d.value}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Link>
          <style>{`
            @keyframes growBar { from { height: 0; } to { height: var(--bar-h); } }
          `}</style>

          {/* Resumen de ventas recientes */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg border border-gray-200 bg-white/60 p-3">
              <div className="text-gray-500">Total 14 días</div>
              <div className="font-semibold text-gray-900">
                S/ {totals.total.toFixed(2)}
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white/60 p-3">
              <div className="text-gray-500">Promedio diario</div>
              <div className="font-semibold text-gray-900">
                S/ {totals.avg.toFixed(2)}
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white/60 p-3">
              <div className="text-gray-500">Mejor día</div>
              <div className="font-semibold text-gray-900">
                {totals.best.label}: S/ {totals.best.value.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Ventas por categoría
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Entradas</span>
              <span className="font-medium text-gray-900">S/ 520.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Platos principales</span>
              <span className="font-medium text-gray-900">S/ 2,100.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Postres</span>
              <span className="font-medium text-gray-900">S/ 640.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Bebidas</span>
              <span className="font-medium text-gray-900">S/ 820.00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Actividad reciente
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Creado: Tiramisú</span>
              <span className="text-gray-500">hace 2h</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Descuento en Lomo Saltado</span>
              <span className="text-gray-500">hace 4h</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">
                Usuario bloqueado: luis@example.com
              </span>
              <span className="text-gray-500">ayer</span>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Notas</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Actualizar precios del Menú</span>
              <span className="text-gray-500">hoy</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Revisar descuentos activos</span>
              <span className="text-gray-500">hoy</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">
                Ver top productos en Reportes
              </span>
              <span className="text-gray-500">esta semana</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Validar usuarios bloqueados</span>
              <span className="text-gray-500">ayer</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Acciones rápidas adicionales (sin duplicar botones del header) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/products"
          className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow"
        >
          <div className="font-medium text-gray-900">Gestionar catálogo</div>
          <div className="text-sm text-gray-600">
            Edita precios, estados y descuentos
          </div>
        </Link>
        <Link
          to="/admin/reports"
          className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow"
        >
          <div className="font-medium text-gray-900">Exportar reportes</div>
          <div className="text-sm text-gray-600">
            Revisa y exporta tus reportes
          </div>
        </Link>
        <Link
          to="/admin/users"
          className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow"
        >
          <div className="font-medium text-gray-900">Invitar usuario</div>
          <div className="text-sm text-gray-600">
            Agrega personal y gestiona roles
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Dashboard;
