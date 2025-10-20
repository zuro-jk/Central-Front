import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

interface AdminProduct {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
  categoryName?: string;
}

interface CategoryOpt { id: number; name: string }
interface IngredientOpt { id: number; name: string; unitId?: number }
interface ProductIngredientForm { ingredientId: number; quantity: number }

// CRUD básico de productos según backend (name, price, imageUrl, categoryId)

function formatPrice(n: number) {
  return `S/ ${n.toFixed(2)}`;
}

function Products() {
  const [products, setProducts] = useState<AdminProduct[]>([]);

  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [form, setForm] = useState<(AdminProduct & { ingredients?: ProductIngredientForm[] }) | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<CategoryOpt[]>([]);
  const [ingredientOpts, setIngredientOpts] = useState<IngredientOpt[]>([]);

  // Cargar productos reales desde el backend (solo lectura)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/api/v1/products");
        // Estructura esperada: { success, message, data: ProductResponse[] }
        const list = (res.data?.data || []) as Array<{ id: number; name: string; price: number; imageUrl?: string; categoryId?: number; categoryName?: string }>
        const mapped: AdminProduct[] = list.map((p) => ({
          id: String(p.id),
          name: p.name,
          price: Number(p.price || 0),
          imageUrl: p.imageUrl || "",
          categoryId: Number(p.categoryId || 0),
          categoryName: p.categoryName,
        }));
        if (mounted && mapped.length) setProducts(mapped);
      } catch (err) {
        // Silencioso: mantener datos simulados si falla
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Cargar categorías e ingredientes (públicos)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [catRes, ingRes] = await Promise.allSettled([
          api.get("/api/v1/categories"),
          api.get("/api/v1/ingredients"),
        ]);
        if (mounted && catRes.status === "fulfilled") {
          const cats = (catRes.value.data?.data || []) as Array<any>;
          setCategories(cats.map((c: any) => ({ id: Number(c.id ?? c.categoryId), name: String(c.name ?? c.categoryName ?? "") })));
        }
        if (mounted && ingRes.status === "fulfilled") {
          const ings = (ingRes.value.data?.data || []) as Array<any>;
          setIngredientOpts(ings.map((i: any) => ({ id: Number(i.id ?? i.ingredientId), name: String(i.name ?? ""), unitId: Number(i.unitId ?? 0) })));
        }
      } catch (_) {}
    })();
    return () => { mounted = false; };
  }, []);

  const categoriesMap = useMemo(() => {
    const m = new Map<number, string>();
    for (const c of categories) m.set(c.id, c.name);
    return m;
  }, [categories]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catLabel = p.categoryName || categoriesMap.get(p.categoryId) || String(p.categoryId);
      const byQ = [p.name, catLabel].some((t) =>
        String(t).toLowerCase().includes(query.toLowerCase())
      );
      return byQ;
    });
  }, [products, query, categoriesMap]);


  function openCreate() {
    setEditing(null);
    setForm({ id: crypto.randomUUID(), name: "", price: 0, imageUrl: "", categoryId: 0, ingredients: [] });
  }

  function openEdit(p: AdminProduct) {
    setEditing(p);
    setForm({ ...p, ingredients: [] });
    setErrors({});
    // Obtener detalles para cargar ingredientes
    (async () => {
      try {
        const res = await api.get(`/api/v1/products/${p.id}`);
        const detail = res.data?.data as { ingredients?: Array<{ ingredientId?: number; id?: number; quantity?: number }> } | undefined;
        if (detail?.ingredients) {
          setForm((prev) => prev ? { ...prev, ingredients: detail.ingredients!.map((it: any) => ({ ingredientId: Number(it.ingredientId ?? it.id), quantity: Number(it.quantity ?? 0) })) } : prev);
        }
      } catch (_) {}
    })();
  }

  function cancelForm() {
    setForm(null);
    setEditing(null);
    setErrors({});
  }

  function validate(current: AdminProduct) {
    const e: Record<string, string> = {};
    if (!current.name?.trim()) e.name = "El nombre es obligatorio";
    if (isNaN(Number(current.price)) || Number(current.price) < 0) e.price = "Precio inválido";
    if (!current.categoryId || Number(current.categoryId) <= 0) e.categoryId = "Categoría obligatoria";
    if ((current as any).imageUrl && !/^https?:\/\//i.test((current as any).imageUrl)) e.imageUrl = "URL de imagen inválida";
    return e;
  }

  async function saveForm() {
    if (!form) return;
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    const token = localStorage.getItem("access_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    // Filtrar ingredientes inválidos (ids o cantidades vacías/no válidas)
    const cleanedIngredients = (form.ingredients || []).filter(i => Number(i.ingredientId) > 0 && Number(i.quantity) > 0)
      .map(i => ({ ingredientId: Number(i.ingredientId), quantity: Number(i.quantity) }));
    try {
      if (editing) {
        const payload = { name: form.name, price: Number(form.price), imageUrl: form.imageUrl || "", categoryId: Number(form.categoryId), ingredients: cleanedIngredients };
        await api.put(`/api/v1/products/${form.id}`, payload, headers ? { headers } : undefined);
      } else {
        const payload = { name: form.name, price: Number(form.price), imageUrl: form.imageUrl || "", categoryId: Number(form.categoryId), ingredients: cleanedIngredients };
        const res = await api.post(`/api/v1/products`, payload, headers ? { headers } : undefined);
        const created = res.data?.data;
        if (created?.id) {
          setProducts((prev) => [{ id: String(created.id), name: created.name, price: Number(created.price || 0), imageUrl: created.imageUrl || "", categoryId: Number(created.categoryId || 0) }, ...prev]);
        }
      }
      // Refrescar lista
      const ref = await api.get("/api/v1/products");
      const list = (ref.data?.data || []) as Array<{ id: number; name: string; price: number; imageUrl?: string; categoryId?: number }>;
      setProducts(list.map(p => ({ id: String(p.id), name: p.name, price: Number(p.price || 0), imageUrl: p.imageUrl || "", categoryId: Number(p.categoryId || 0) })));
      cancelForm();
    } catch (_) {
      // ignore
    }
  }

  async function remove(id: string) {
    const token = localStorage.getItem("access_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    try {
      await api.delete(`/api/v1/products/${id}`, headers ? { headers } : undefined);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (_) {}
  }

  // No aplica en backend actual

  function effectivePrice(p: AdminProduct) {
    return { base: formatPrice(Number(p.price || 0)), final: formatPrice(Number(p.price || 0)) };
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-red-700">Menú</h1>
        <div className="flex gap-2">
          <input placeholder="Buscar..." className="border border-gray-300 rounded-md px-3 py-2 w-48" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700" onClick={openCreate}>Nuevo plato</button>
        </div>
      </div>

      {/* Sección de más vendidos removida por no aplicar al modelo actual */}

      {/* Listado */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-md overflow-hidden">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-3">Menú</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Imagen</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-sm text-gray-500">Sin datos</td>
              </tr>
            )}
            {filtered.map((p) => {
              const price = effectivePrice(p);
              return (
                <tr key={p.id} className="border-t border-gray-100 text-sm">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded-md" /> : <div className="w-12 h-12 bg-gray-100 rounded" />}
                      <div>
                        <div className="font-semibold text-red-700">{p.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{price.base}</td>
                  <td className="p-3">{p.imageUrl ? "Sí" : "—"}</td>
                  <td className="p-3">{p.categoryName || categoriesMap.get(p.categoryId) || p.categoryId}</td>
                  <td className="p-3 space-x-2">
                    <button className="text-red-700 hover:underline" onClick={() => openEdit(p)}>Editar</button>
                    <button className="text-amber-700 hover:underline" onClick={() => remove(p.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Formulario de creación/edición */}
      {form && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-semibold text-red-700">{editing ? "Editar producto" : "Nuevo producto"}</h2>
            {!localStorage.getItem("access_token") && (
              <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
                Requiere token ADMIN para guardar (POST/PUT/DELETE). Solo lectura sin token.
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600">Nombre</label>
                <input className={`w-full border rounded-md px-3 py-2 ${errors.name ? 'border-red-500' : ''}`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600">Categoría</label>
                <select className={`w-full border rounded-md px-3 py-2 ${errors.categoryId ? 'border-red-500' : ''}`} value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}>
                  <option value={0}>Selecciona categoría</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-xs text-red-600 mt-1">{errors.categoryId}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600">Precio</label>
                <input type="number" step="0.01" className={`w-full border rounded-md px-3 py-2 ${errors.price ? 'border-red-500' : ''}`} value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600">Imagen (URL)</label>
                <input className={`w-full border rounded-md px-3 py-2 ${errors.imageUrl ? 'border-red-500' : ''}`} value={form.imageUrl || ""}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
                {errors.imageUrl && <p className="text-xs text-red-600 mt-1">{errors.imageUrl}</p>}
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm text-gray-600">Ingredientes</label>
                  <button type="button" className="text-sm text-red-700" onClick={() => setForm({ ...form, ingredients: [...(form.ingredients || []), { ingredientId: 0, quantity: 0 }] })}>Agregar ingrediente</button>
                </div>
                <div className="mt-2 space-y-2">
                  {(form.ingredients || []).length === 0 && <div className="text-sm text-gray-500">Sin ingredientes</div>}
                  {(form.ingredients || []).map((ing, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                      <select className="border rounded-md px-3 py-2" value={ing.ingredientId} onChange={(e) => {
                        const v = Number(e.target.value);
                        const arr = [...(form.ingredients || [])];
                        arr[idx] = { ...arr[idx], ingredientId: v };
                        setForm({ ...form, ingredients: arr });
                      }}>
                        <option value={0}>Selecciona ingrediente</option>
                        {ingredientOpts.map(o => (<option key={o.id} value={o.id}>{o.name} ({o.id})</option>))}
                      </select>
                      <input type="number" step="0.01" className="border rounded-md px-3 py-2" value={ing.quantity} onChange={(e) => {
                        const v = Number(e.target.value);
                        const arr = [...(form.ingredients || [])];
                        arr[idx] = { ...arr[idx], quantity: v };
                        setForm({ ...form, ingredients: arr });
                      }} />
                      <div className="flex justify-end">
                        <button type="button" className="text-sm text-gray-600" onClick={() => {
                          const arr = [...(form.ingredients || [])];
                          arr.splice(idx, 1);
                          setForm({ ...form, ingredients: arr });
                        }}>Quitar</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded-md border border-gray-300" onClick={cancelForm}>Cancelar</button>
              <button className="px-4 py-2 rounded-md bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed" onClick={saveForm}
                disabled={!!Object.keys(errors).length || !form.name?.trim() || Number.isNaN(Number(form.price)) || Number(form.price) < 0 || !form.categoryId}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Products;
