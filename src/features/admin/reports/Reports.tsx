import { api } from "@/core/api/api";
import { useEffect, useMemo, useState } from "react";

function Reports() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [orders, setOrders] = useState<
    Array<{ id?: number | string; total?: number; date?: string }>
  >([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get(
          "orders",
          token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
        );
        const list = (res.data?.data || []) as Array<{
          id?: number | string;
          total?: number;
          date?: string;
        }>;
        if (mounted) setOrders(Array.isArray(list) ? list : []);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        if (mounted) setOrders([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const todayMetrics = useMemo(() => {
    const today = new Date();
    const todays = orders.filter(
      (o) =>
        o.date &&
        (() => {
          const d = new Date(o.date);
          return (
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()
          );
        })()
    );
    const sales = todays.reduce((a, c) => a + Number(c.total || 0), 0);
    const count = todays.length;
    const avg = count ? sales / count : 0;
    return { sales, orders: count, avgTicket: avg };
  }, [orders]);

  const last14Series = useMemo(() => {
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      d.setHours(0, 0, 0, 0);
      return d;
    });
    const values = days.map((d) => {
      const sum = orders.reduce((acc, o) => {
        if (!o.date) return acc;
        const od = new Date(o.date);
        const sameDay =
          od.getFullYear() === d.getFullYear() &&
          od.getMonth() === d.getMonth() &&
          od.getDate() === d.getDate();
        return acc + (sameDay ? Number(o.total || 0) : 0);
      }, 0);
      return { day: `D${days.indexOf(d) + 1}`, value: sum };
    });
    return values;
  }, [orders]);

  const byCategory = useMemo(
    () => [] as Array<{ label: string; value: number }>,
    []
  );
  const distribution = useMemo(
    () => [] as Array<{ label: string; pct: number }>,
    []
  );
  const growth = useMemo(
    () => ({ salesGrowthPct: 0, ordersGrowthPct: 0, avgTicketGrowthPct: 0 }),
    []
  );
  const paymentMethods = useMemo(
    () => [] as Array<{ label: string; value: number }>,
    []
  );
  // const salesByHour = useMemo(
  //   () => [] as Array<{ hour: number; value: number }>,
  //   []
  // );
  const recentOrders = useMemo(
    () =>
      orders
        .slice(-10)
        .reverse()
        .map((o) => ({
          id: String(o.id ?? ""),
          client: "",
          total: Number(o.total || 0),
          time: "",
        })),
    [orders]
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Reportes
          </h1>
          <p className="text-gray-600 text-sm">
            Analiza tu negocio por rango de fechas
          </p>
        </div>
        <div className="hidden md:flex items-end gap-2">
          <div>
            <label className="block text-xs text-gray-500">Desde</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Hasta</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border rounded-md px-3 py-2"
            />
          </div>
          <button className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
            Aplicar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Ventas (hoy)</div>
          <div className="text-2xl font-bold text-red-700">
            S/ {todayMetrics.sales.toFixed(2)}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Pedidos (hoy)</div>
          <div className="text-2xl font-bold text-red-700">
            {todayMetrics.orders}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Ticket promedio</div>
          <div className="text-2xl font-bold text-red-700">
            S/ {todayMetrics.avgTicket.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Ventas por categoría
          </h2>
          <ul className="mt-4 space-y-2">
            {byCategory.length === 0 && (
              <li className="text-sm text-gray-500">Sin datos</li>
            )}
          </ul>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Últimos 14 días
            </h2>
            <div className="text-xs text-gray-500">Animado</div>
          </div>
          <div className="mt-4">
            <div className="h-48 rounded-lg bg-gradient-to-b from-red-50 to-amber-50 border border-amber-200 px-3 py-3">
              <div className="h-full flex items-end gap-2">
                {last14Series.map((d, idx) => {
                  const delay = 30 * idx;
                  const h = Math.max(
                    10,
                    Math.min(100, Math.round((d.value / 1000) * 100))
                  );
                  return (
                    <div
                      key={d.day}
                      className="flex-1 group"
                    >
                      <div
                        className="w-full bg-red-300/70 group-hover:bg-red-400 transition-[height,background-color] duration-700 ease-out rounded-md"
                        style={{
                          height: 0,
                          animation: `growBar 800ms ${delay}ms forwards`,
                          ["--bar-h"]: `${h}px`,
                        }}
                        aria-label={`${d.day}: S/ ${d.value}`}
                        title={`${d.day}: S/ ${d.value}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <style>{`@keyframes growBar { from { height: 0; } to { height: var(--bar-h); } }`}</style>
          </div>
        </div>
      </div>

      {/* Distribución por categoría (porcentajes) y Crecimiento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Distribución por categoría
          </h2>
          <div className="mt-4 space-y-3">
            {distribution.length === 0 && (
              <div className="text-sm text-gray-500">Sin datos</div>
            )}
            {distribution.map((item, idx) => (
              <div
                key={idx}
                className="text-sm text-gray-700"
              >
                {item.label}: {item.pct.toFixed(2)}%
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Crecimiento vs periodo anterior
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg border border-gray-200 p-3">
              <div className="text-gray-500">Ventas</div>
              <div
                className={`font-semibold ${
                  growth.salesGrowthPct >= 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                {growth.salesGrowthPct}%
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <div className="text-gray-500">Pedidos</div>
              <div
                className={`font-semibold ${
                  growth.ordersGrowthPct >= 0
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {growth.ordersGrowthPct}%
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-3">
              <div className="text-gray-500">Ticket prom.</div>
              <div
                className={`font-semibold ${
                  growth.avgTicketGrowthPct >= 0
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {growth.avgTicketGrowthPct}%
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Métodos de pago
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {paymentMethods.length === 0 && (
              <li className="text-gray-500">Sin datos</li>
            )}
            {paymentMethods.map((item, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-700"
              >
                {item.label}: S/ {item.value.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ventas por hora (hoy) */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Ventas por hora (hoy)
        </h2>
        <div className="mt-4 text-sm text-gray-500">Sin datos</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Top productos</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="text-gray-500">Sin datos</li>
          </ul>
        </div>
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Pedidos recientes
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Cliente</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2">Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-4 text-center text-gray-500"
                    >
                      Sin datos
                    </td>
                  </tr>
                )}
                {recentOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-gray-100"
                  >
                    <td className="py-2 pr-4 font-medium text-gray-900">
                      {o.id}
                    </td>
                    <td className="py-2 pr-4 text-gray-700">{o.client}</td>
                    <td className="py-2 pr-4 text-gray-900">
                      S/ {o.total.toFixed(2)}
                    </td>
                    <td className="py-2 text-gray-500">{o.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reports;
