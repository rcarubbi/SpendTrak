import { useState } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { toastSuccess } from "../stores/toastStore";
import type { CategoryType } from "../types";
import CategoryCard from "../components/CategoryCard";
import CategoryFormModal from "../components/CategoryFormModal";
import KeywordModal from "../components/KeywordModal";
import ConfirmModal from "../components/ConfirmModal";

export default function Categories() {
  const cats = useCategoryStore((s) => s.categories);
  const updateCategory = useCategoryStore((s) => s.updateCategory);
  const deleteCategory = useCategoryStore((s) => s.deleteCategory);

  const [editing, setEditing] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showKeywordModal, setShowKeywordModal] = useState(false);
  const [keywordCategoryId, setKeywordCategoryId] = useState("");
  const [confirmAction, setConfirmAction] = useState<{ type: "delete-category"; id: string; name: string } | { type: "delete-keyword"; catId: string; kw: string; name: string } | null>(null);

  const handleEditName = async (id: string, name: string) => {
    await updateCategory(id, { name });
    toastSuccess("Name updated");
  };

  const handleEditColor = async (id: string, color: string) => {
    await updateCategory(id, { color });
    toastSuccess("Color updated");
  };

  const handleEditType = async (id: string, type: CategoryType) => {
    await updateCategory(id, { type });
    toastSuccess("Type updated");
  };

  const handleDelete = (id: string) => {
    const cat = cats.find((c) => c.id === id);
    if (!cat) return;
    setConfirmAction({ type: "delete-category", id, name: cat.name });
  };

  const handleAddKeyword = (catId: string) => {
    setKeywordCategoryId(catId);
    setShowKeywordModal(true);
  };

  const handleRemoveKeyword = (catId: string, kw: string) => {
    setConfirmAction({ type: "delete-keyword", catId, kw, name: kw });
  };

  const handleConfirmDelete = async () => {
    const action = confirmAction;
    setConfirmAction(null);
    if (!action) return;
    if (action.type === "delete-category") {
      await deleteCategory(action.id);
    } else {
      const cat = cats.find((c) => c.id === action.catId);
      if (cat) {
        await updateCategory(action.catId, { keywords: cat.keywords.filter((k) => k !== action.kw) });
        toastSuccess(`Keyword "${action.kw}" removed`);
      }
    }
  };

  const handleFinishEdit = (id: string, name: string) => {
    handleEditName(id, name);
    setEditing(null);
  };

  const confirmTitle = confirmAction?.type === "delete-category"
    ? `Delete category "${confirmAction.name}"?`
    : `Delete keyword "${confirmAction?.name}"?`;

  const confirmMessage = confirmAction?.type === "delete-category"
    ? "All transactions assigned to this category will be reclassified."
    : "Remove this keyword from the category.";

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-gray-100">Categories</h1>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
          + New Category
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {cats.map((cat) => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            editing={editing}
            onStartEdit={setEditing}
            onFinishEdit={handleFinishEdit}
            onCancelEdit={() => setEditing(null)}
            onEditColor={handleEditColor}
            onEditType={handleEditType}
            onDelete={handleDelete}
            onAddKeyword={handleAddKeyword}
            onRemoveKeyword={handleRemoveKeyword}
          />
        ))}
      </div>

      <CategoryFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />

      <KeywordModal
        show={showKeywordModal}
        categoryId={keywordCategoryId}
        onClose={() => {
          setShowKeywordModal(false);
          setKeywordCategoryId("");
        }}
      />

      <ConfirmModal
        show={confirmAction !== null}
        title={confirmTitle}
        message={confirmMessage}
        confirmLabel={confirmAction?.type === "delete-category" ? "Delete" : "Remove"}
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
}
