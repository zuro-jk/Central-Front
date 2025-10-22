import { useState } from "react";
import { FaCalendarAlt, FaClock, FaUsers, FaUser, FaEnvelope, FaPhone, FaCheckCircle } from "react-icons/fa";

function Reservations() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    tableType: "interior",
    specialRequests: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías enviar los datos a tu backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const availableTimes = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  const tableTypes = [
    { value: "interior", label: "Mesa Interior", description: "Ambiente acogedor y climatizado" },
    { value: "terraza", label: "Terraza", description: "Vista al aire libre" },
    { value: "privado", label: "Salón Privado", description: "Para eventos especiales (6+ personas)" }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-red-50 to-amber-50 min-h-screen relative">
      <h2 className="text-5xl font-bold text-center text-red-700 mb-12">
        Reserva tu mesa
      </h2>
      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12 text-lg">
        Completa el formulario y asegura tu mesa en nuestro restaurante. ¡Te esperamos!
      </p>

      {/* Notificación de reserva exitosa */}
      {submitted && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-6 rounded-lg shadow-lg z-50 animate-bounce flex items-center gap-3">
          <FaCheckCircle className="text-2xl" />
          <div>
            <p className="font-bold">¡Reserva confirmada!</p>
            <p className="text-sm">Te contactaremos pronto para confirmar los detalles.</p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Información del restaurante */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FaClock className="text-3xl text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Horarios</h3>
            <p className="text-gray-600">Lunes a Domingo</p>
            <p className="text-gray-600">12:00 PM - 11:00 PM</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FaUsers className="text-3xl text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Capacidad</h3>
            <p className="text-gray-600">Hasta 10 personas</p>
            <p className="text-gray-600">por reserva</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FaPhone className="text-3xl text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Contacto</h3>
            <p className="text-gray-600">(+51) 987 654 321</p>
            <p className="text-gray-600">reservas@foraneos.com</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <FaUser className="text-red-600" />
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <FaEnvelope className="text-red-600" />
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <FaPhone className="text-red-600" />
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="999 999 999"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <FaUsers className="text-red-600" />
                Número de personas
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} persona{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <FaCalendarAlt className="text-red-600" />
                Fecha
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <FaClock className="text-red-600" />
                Hora preferida
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="">Selecciona una hora</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tipo de mesa */}
          <div className="mb-8">
            <label className="mb-4 font-semibold text-gray-700 block">Tipo de mesa preferida</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tableTypes.map((type) => (
                <label
                  key={type.value}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    formData.tableType === type.value
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-red-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="tableType"
                    value={type.value}
                    checked={formData.tableType === type.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-800 mb-1">{type.label}</h4>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Solicitudes especiales */}
          <div className="mb-8">
            <label className="mb-2 font-semibold text-gray-700 block">
              Solicitudes especiales (opcional)
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={4}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
              placeholder="Cumpleaños, aniversario, alergias alimentarias, etc."
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-600 text-white font-semibold px-12 py-4 rounded-xl hover:bg-red-700 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Reservations;
