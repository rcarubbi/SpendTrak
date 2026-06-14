import { useState } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import type { CategoryType } from "../types";

export default function Categories() {
  const cats = useCategoryStore((s) => s.categories);
  const addCategory = useCategoryStore((s) => s.addCategory);
  const updateCategory = useCategoryStore((s) => s.updateCategory);
  const deleteCategory = useCategoryStore((s) => s.deleteCategory);

  const [editing, setEditing] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: "", name: "", color: "#6366f1", type: "debit" as CategoryType });

  const handleEditName = async (id: string, name: string) => {
    await updateCategory(id, { name });
  };

  const handleEditColor = async (id: string, color: string) => {
    await updateCategory(id, { color });
  };

  const handleEditType = async (id: string, type: CategoryType) => {
    await updateCategory(id, { type });
  };

  const handleCreate = async () => {
    const id = form.id.trim().toLowerCase().replace(/\s+/g, "_");
    if (!id || cats.find((c) => c.id === id)) return;
    await addCategory({ id, name: form.name || id, color: form.color, type: form.type, keywords: [] });
    setShowModal(false);
    setForm({ id: "", name: "", color: "#6366f1", type: "debit" });
  };

  const handleDelete = async (id: string) => {
    const cat = cats.find((c) => c.id === id);
    if (!cat) return;
    if (!confirm(`Deletar categoria "${cat.name}"?`)) return;
    await deleteCategory(id);
  };

  const handleAddKeyword = async (catId: string) => {
    const kw = prompt("Nova keyword (palavra-chave para classificar)");
    if (!kw) return;
    const cat = cats.find((c) => c.id === catId);
    if (!cat) return;
    await updateCategory(catId, { keywords: [...cat.keywords, kw.toUpperCase()] });
  };

  const handleRemoveKeyword = async (catId: string, kw: string) => {
    const cat = cats.find((c) => c.id === catId);
    if (!cat) return;
    await updateCategory(catId, { keywords: cat.keywords.filter((k) => k !== kw) });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-gray-100">Categorias</h1>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
          + Nova Categoria
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {cats.filter((c) => c.id !== "receita").map((cat) => (
          <div key={cat.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <input
                type="color"
                value={cat.color}
                onChange={(e) => handleEditColor(cat.id, e.target.value)}
                className="w-8 h-8 border-none cursor-pointer p-0 shrink-0"
              />
              {editing === cat.id ? (
                <input
                  defaultValue={cat.name}
                  onBlur={(e) => { handleEditName(cat.id, e.target.value); setEditing(null); }}
                  onKeyDown={(e) => e.key === "Enter" && setEditing(null)}
                  autoFocus
                  className="text-base font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-2 py-0.5"
                />
              ) : (
                <span className="font-semibold text-base cursor-pointer dark:text-gray-100" onClick={() => setEditing(cat.id)}>
                  {cat.name}
                </span>
              )}
              <span className="text-gray-400 dark:text-gray-500 text-xs">({cat.keywords.length} keywords)</span>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${cat.type === "credit" ? "text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300" : "text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300"}`}>
                {cat.type === "credit" ? "CRÉDITO" : "DÉBITO"}
              </span>
              {cat.id !== "outros" && (
                <>
                  <select
                    value={cat.type}
                    onChange={(e) => handleEditType(cat.id, e.target.value as CategoryType)}
                    className="text-xs border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-1 py-0.5"
                  >
                    <option value="debit">Débito</option>
                    <option value="credit">Crédito</option>
                  </select>
                  <button onClick={() => handleDelete(cat.id)} className="ml-auto text-red-600 dark:text-red-400 text-xs font-semibold cursor-pointer hover:text-red-800 dark:hover:text-red-300 transition-colors">
                    Deletar
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {cat.keywords.map((kw) => (
                <span key={kw} className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs dark:text-gray-200">
                  {kw}
                  {cat.id !== "outros" && (
                    <button onClick={() => handleRemoveKeyword(cat.id, kw)} className="border-none bg-none cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm p-0 leading-none">
                      ×
                    </button>
                  )}
                </span>
              ))}
              <button onClick={() => handleAddKeyword(cat.id)} className="border border-dashed border-gray-300 dark:border-gray-600 rounded-full px-2 py-0.5 text-xs cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-gray-300">
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4 dark:text-gray-100">Nova Categoria</h2>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">ID</label>
                <input
                  value={form.id}
                  onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
                  placeholder="ex: pets"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">Nome</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="ex: Pets"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">Cor</label>
                  <input
                    type="color"
                    value={form.color}
                    onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                    className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer p-0.5"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">Tipo</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as CategoryType }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm"
                  >
                    <option value="debit">Débito (despesa)</option>
                    <option value="credit">Crédito (receita)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  Cancelar
                </button>
                <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
                  Criar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
