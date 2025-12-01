function Dashboard() {
  const mesasAsignadas = 5;
  const pedidosActivos = 3;
  const pedidosListos = 2;
  const totalDia = 250.5;

  return (
    <div className="p-6 bg-gray-50 min-h-[10vh] max-w-6xl mx-auto my-10 rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Panel del Mesero
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-5 text-center">
          <h2 className="text-gray-500 mb-2">Mesas Asignadas</h2>
          <p className="text-2xl font-semibold text-red-600">
            {mesasAsignadas}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <h2 className="text-gray-500 mb-2">Pedidos Activos</h2>
          <p className="text-2xl font-semibold text-orange-500">
            {pedidosActivos}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <h2 className="text-gray-500 mb-2">Pedidos Listos</h2>
          <p className="text-2xl font-semibold text-green-500">
            {pedidosListos}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <h2 className="text-gray-500 mb-2">Total del Día</h2>
          <p className="text-2xl font-semibold text-blue-600">S/. {totalDia}</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Notificaciones
        </h2>
      </div>
    </div>
  );
}

export default Dashboard;
