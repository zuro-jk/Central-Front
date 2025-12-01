import { useAuthStore } from "@/core/stores/auth/auth.store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
};

export default function Profile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      username: user?.username || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    console.log("Actualizando datos:", data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Perfil actualizado correctamente");
    setIsEditing(false);
  };

  if (!user) return <div className="text-white p-10">Cargando perfil...</div>;

  const getInitials = () => {
    const first = user.firstName?.charAt(0).toUpperCase() || "";
    const last = user.lastName?.charAt(0).toUpperCase() || "";
    return `${first}${last}`;
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in-down">
          <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
          <p className="text-gray-400 mt-1">
            Gestiona tu información personal y seguridad
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-neutral-800 shadow-xl flex flex-col items-center text-center relative overflow-hidden transition-all hover:border-neutral-700">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-red-900/50 to-neutral-900/50 z-0"></div>

              <div className="relative z-10 mt-8 mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-[#1e1e1e] shadow-2xl overflow-hidden bg-neutral-800 flex items-center justify-center text-4xl font-bold text-gray-400 relative group">
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{getInitials()}</span>
                  )}

                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white relative z-10">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-red-500 font-medium text-sm relative z-10 mb-4">
                {user.email}
              </p>

              <div className="w-full border-t border-neutral-700 pt-4 mt-2 grid grid-cols-2 gap-4">
                {/* <div className="text-center">
                  <span className="block text-2xl font-bold text-white">
                    12
                  </span>{" "}
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Pedidos
                  </span>
                </div> */}
                {/* <div className="text-center border-l border-neutral-700">
                  <span className="block text-2xl font-bold text-yellow-500">
                    {user.points || 0}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Puntos
                  </span>
                </div> */}
              </div>
            </div>

            {/* <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden transform transition-transform hover:scale-[1.02]">
              <svg
                className="absolute -right-4 -bottom-4 w-32 h-32 text-red-700 opacity-50"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                Nivel: {user.roles?.includes("ROLE_VIP") ? "VIP" : "Explorador"}
                {user.roles?.includes("ROLE_VIP") && (
                  <span className="text-yellow-400">★</span>
                )}
              </h3>
              <p className="text-red-100 text-sm mb-4 relative z-10">
                Te faltan 250 puntos para el siguiente nivel.
              </p>
              <div className="w-full bg-red-950/50 rounded-full h-2 relative z-10">
                <div
                  className="bg-white h-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div> */}
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1e1e1e] rounded-2xl border border-neutral-800 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-[#252525]">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Información Personal
                </h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Editar datos
                  </button>
                )}
              </div>

              <div className="p-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Usuario
                      </label>
                      <input
                        type="text"
                        disabled
                        {...register("username")}
                        className="w-full px-4 py-3 bg-[#121212] border border-neutral-700 rounded-lg text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        disabled
                        {...register("email")}
                        className="w-full px-4 py-3 bg-[#121212] border border-neutral-700 rounded-lg text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        {...register("firstName", {
                          required: "El nombre es obligatorio",
                        })}
                        className={`w-full px-4 py-3 bg-[#121212] border rounded-lg text-white focus:outline-none transition-all ${
                          isEditing
                            ? "border-neutral-600 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-transparent px-0 bg-transparent"
                        }`}
                      />
                      {errors.firstName && (
                        <span className="text-red-500 text-xs">
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Apellido
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        {...register("lastName", {
                          required: "El apellido es obligatorio",
                        })}
                        className={`w-full px-4 py-3 bg-[#121212] border rounded-lg text-white focus:outline-none transition-all ${
                          isEditing
                            ? "border-neutral-600 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-transparent px-0 bg-transparent"
                        }`}
                      />
                      {errors.lastName && (
                        <span className="text-red-500 text-xs">
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        disabled={!isEditing}
                        {...register("phone")}
                        placeholder="Sin registrar"
                        className={`w-full px-4 py-3 bg-[#121212] border rounded-lg text-white focus:outline-none transition-all ${
                          isEditing
                            ? "border-neutral-600 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-transparent px-0 bg-transparent"
                        }`}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800 animate-fade-in">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-neutral-800 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Guardando...
                          </>
                        ) : (
                          "Guardar Cambios"
                        )}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-2xl border border-neutral-800 shadow-xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
              <div className="p-6 border-b border-neutral-800 bg-[#252525]">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Seguridad
                </h3>
              </div>
              <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-white font-medium">Contraseña</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Se recomienda cambiarla cada 3 meses para mayor seguridad.
                  </p>
                </div>
                <button className="px-4 py-2 border border-neutral-600 text-gray-300 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors text-sm w-full sm:w-auto">
                  Cambiar contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
