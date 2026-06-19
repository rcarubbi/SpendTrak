// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { useState } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { toastSuccess } from "../stores/toastStore";
import type { CategoryType } from "../types";
import CategoryCard from "../components/CategoryCard";
import CategoryFormModal from "../components/CategoryFormModal";
import KeywordModal from "../components/KeywordModal";
import ConfirmModal from "../components/ConfirmModal";
export default function Categories() {
  if (stryMutAct_9fa48("714")) {
    {}
  } else {
    stryCov_9fa48("714");
    const cats = useCategoryStore(stryMutAct_9fa48("715") ? () => undefined : (stryCov_9fa48("715"), s => s.categories));
    const updateCategory = useCategoryStore(stryMutAct_9fa48("716") ? () => undefined : (stryCov_9fa48("716"), s => s.updateCategory));
    const deleteCategory = useCategoryStore(stryMutAct_9fa48("717") ? () => undefined : (stryCov_9fa48("717"), s => s.deleteCategory));
    const [editing, setEditing] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(stryMutAct_9fa48("718") ? true : (stryCov_9fa48("718"), false));
    const [showKeywordModal, setShowKeywordModal] = useState(stryMutAct_9fa48("719") ? true : (stryCov_9fa48("719"), false));
    const [keywordCategoryId, setKeywordCategoryId] = useState(stryMutAct_9fa48("720") ? "Stryker was here!" : (stryCov_9fa48("720"), ""));
    const [confirmAction, setConfirmAction] = useState<{
      type: "delete-category";
      id: string;
      name: string;
    } | {
      type: "delete-keyword";
      catId: string;
      kw: string;
      name: string;
    } | null>(null);
    const handleEditName = async (id: string, name: string) => {
      if (stryMutAct_9fa48("721")) {
        {}
      } else {
        stryCov_9fa48("721");
        await updateCategory(id, stryMutAct_9fa48("722") ? {} : (stryCov_9fa48("722"), {
          name
        }));
        toastSuccess(stryMutAct_9fa48("723") ? "" : (stryCov_9fa48("723"), "Name updated"));
      }
    };
    const handleEditColor = async (id: string, color: string) => {
      if (stryMutAct_9fa48("724")) {
        {}
      } else {
        stryCov_9fa48("724");
        await updateCategory(id, stryMutAct_9fa48("725") ? {} : (stryCov_9fa48("725"), {
          color
        }));
        toastSuccess(stryMutAct_9fa48("726") ? "" : (stryCov_9fa48("726"), "Color updated"));
      }
    };
    const handleEditType = async (id: string, type: CategoryType) => {
      if (stryMutAct_9fa48("727")) {
        {}
      } else {
        stryCov_9fa48("727");
        await updateCategory(id, stryMutAct_9fa48("728") ? {} : (stryCov_9fa48("728"), {
          type
        }));
        toastSuccess(stryMutAct_9fa48("729") ? "" : (stryCov_9fa48("729"), "Type updated"));
      }
    };
    const handleDelete = (id: string) => {
      if (stryMutAct_9fa48("730")) {
        {}
      } else {
        stryCov_9fa48("730");
        const cat = cats.find(stryMutAct_9fa48("731") ? () => undefined : (stryCov_9fa48("731"), c => stryMutAct_9fa48("734") ? c.id !== id : stryMutAct_9fa48("733") ? false : stryMutAct_9fa48("732") ? true : (stryCov_9fa48("732", "733", "734"), c.id === id)));
        if (stryMutAct_9fa48("737") ? false : stryMutAct_9fa48("736") ? true : stryMutAct_9fa48("735") ? cat : (stryCov_9fa48("735", "736", "737"), !cat)) return;
        setConfirmAction(stryMutAct_9fa48("738") ? {} : (stryCov_9fa48("738"), {
          type: stryMutAct_9fa48("739") ? "" : (stryCov_9fa48("739"), "delete-category"),
          id,
          name: cat.name
        }));
      }
    };
    const handleAddKeyword = (catId: string) => {
      if (stryMutAct_9fa48("740")) {
        {}
      } else {
        stryCov_9fa48("740");
        setKeywordCategoryId(catId);
        setShowKeywordModal(stryMutAct_9fa48("741") ? false : (stryCov_9fa48("741"), true));
      }
    };
    const handleRemoveKeyword = (catId: string, kw: string) => {
      if (stryMutAct_9fa48("742")) {
        {}
      } else {
        stryCov_9fa48("742");
        setConfirmAction(stryMutAct_9fa48("743") ? {} : (stryCov_9fa48("743"), {
          type: stryMutAct_9fa48("744") ? "" : (stryCov_9fa48("744"), "delete-keyword"),
          catId,
          kw,
          name: kw
        }));
      }
    };
    const handleConfirmDelete = async () => {
      if (stryMutAct_9fa48("745")) {
        {}
      } else {
        stryCov_9fa48("745");
        const action = confirmAction;
        setConfirmAction(null);
        if (stryMutAct_9fa48("748") ? false : stryMutAct_9fa48("747") ? true : stryMutAct_9fa48("746") ? action : (stryCov_9fa48("746", "747", "748"), !action)) return;
        if (stryMutAct_9fa48("751") ? action.type !== "delete-category" : stryMutAct_9fa48("750") ? false : stryMutAct_9fa48("749") ? true : (stryCov_9fa48("749", "750", "751"), action.type === (stryMutAct_9fa48("752") ? "" : (stryCov_9fa48("752"), "delete-category")))) {
          if (stryMutAct_9fa48("753")) {
            {}
          } else {
            stryCov_9fa48("753");
            await deleteCategory(action.id);
          }
        } else {
          if (stryMutAct_9fa48("754")) {
            {}
          } else {
            stryCov_9fa48("754");
            const cat = cats.find(stryMutAct_9fa48("755") ? () => undefined : (stryCov_9fa48("755"), c => stryMutAct_9fa48("758") ? c.id !== action.catId : stryMutAct_9fa48("757") ? false : stryMutAct_9fa48("756") ? true : (stryCov_9fa48("756", "757", "758"), c.id === action.catId)));
            if (stryMutAct_9fa48("760") ? false : stryMutAct_9fa48("759") ? true : (stryCov_9fa48("759", "760"), cat)) {
              if (stryMutAct_9fa48("761")) {
                {}
              } else {
                stryCov_9fa48("761");
                await updateCategory(action.catId, stryMutAct_9fa48("762") ? {} : (stryCov_9fa48("762"), {
                  keywords: stryMutAct_9fa48("763") ? cat.keywords : (stryCov_9fa48("763"), cat.keywords.filter(stryMutAct_9fa48("764") ? () => undefined : (stryCov_9fa48("764"), k => stryMutAct_9fa48("767") ? k === action.kw : stryMutAct_9fa48("766") ? false : stryMutAct_9fa48("765") ? true : (stryCov_9fa48("765", "766", "767"), k !== action.kw))))
                }));
                toastSuccess(stryMutAct_9fa48("768") ? `` : (stryCov_9fa48("768"), `Keyword "${action.kw}" removed`));
              }
            }
          }
        }
      }
    };
    const handleFinishEdit = (id: string, name: string) => {
      if (stryMutAct_9fa48("769")) {
        {}
      } else {
        stryCov_9fa48("769");
        handleEditName(id, name);
        setEditing(null);
      }
    };
    const confirmTitle = (stryMutAct_9fa48("772") ? confirmAction?.type !== "delete-category" : stryMutAct_9fa48("771") ? false : stryMutAct_9fa48("770") ? true : (stryCov_9fa48("770", "771", "772"), (stryMutAct_9fa48("773") ? confirmAction.type : (stryCov_9fa48("773"), confirmAction?.type)) === (stryMutAct_9fa48("774") ? "" : (stryCov_9fa48("774"), "delete-category")))) ? stryMutAct_9fa48("775") ? `` : (stryCov_9fa48("775"), `Delete category "${confirmAction.name}"?`) : stryMutAct_9fa48("776") ? `` : (stryCov_9fa48("776"), `Delete keyword "${stryMutAct_9fa48("777") ? confirmAction.name : (stryCov_9fa48("777"), confirmAction?.name)}"?`);
    const confirmMessage = (stryMutAct_9fa48("780") ? confirmAction?.type !== "delete-category" : stryMutAct_9fa48("779") ? false : stryMutAct_9fa48("778") ? true : (stryCov_9fa48("778", "779", "780"), (stryMutAct_9fa48("781") ? confirmAction.type : (stryCov_9fa48("781"), confirmAction?.type)) === (stryMutAct_9fa48("782") ? "" : (stryCov_9fa48("782"), "delete-category")))) ? stryMutAct_9fa48("783") ? "" : (stryCov_9fa48("783"), "All transactions assigned to this category will be reclassified.") : stryMutAct_9fa48("784") ? "" : (stryCov_9fa48("784"), "Remove this keyword from the category.");
    return <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-gray-100">Categories</h1>
        <button onClick={stryMutAct_9fa48("785") ? () => undefined : (stryCov_9fa48("785"), () => setShowModal(stryMutAct_9fa48("786") ? false : (stryCov_9fa48("786"), true)))} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
          + New Category
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {cats.map(stryMutAct_9fa48("787") ? () => undefined : (stryCov_9fa48("787"), cat => <CategoryCard key={cat.id} cat={cat} editing={editing} onStartEdit={setEditing} onFinishEdit={handleFinishEdit} onCancelEdit={stryMutAct_9fa48("788") ? () => undefined : (stryCov_9fa48("788"), () => setEditing(null))} onEditColor={handleEditColor} onEditType={handleEditType} onDelete={handleDelete} onAddKeyword={handleAddKeyword} onRemoveKeyword={handleRemoveKeyword} />))}
      </div>

      <CategoryFormModal show={showModal} onClose={stryMutAct_9fa48("789") ? () => undefined : (stryCov_9fa48("789"), () => setShowModal(stryMutAct_9fa48("790") ? true : (stryCov_9fa48("790"), false)))} />

      <KeywordModal show={showKeywordModal} categoryId={keywordCategoryId} onClose={() => {
        if (stryMutAct_9fa48("791")) {
          {}
        } else {
          stryCov_9fa48("791");
          setShowKeywordModal(stryMutAct_9fa48("792") ? true : (stryCov_9fa48("792"), false));
          setKeywordCategoryId(stryMutAct_9fa48("793") ? "Stryker was here!" : (stryCov_9fa48("793"), ""));
        }
      }} />

      <ConfirmModal show={stryMutAct_9fa48("796") ? confirmAction === null : stryMutAct_9fa48("795") ? false : stryMutAct_9fa48("794") ? true : (stryCov_9fa48("794", "795", "796"), confirmAction !== null)} title={confirmTitle} message={confirmMessage} confirmLabel={(stryMutAct_9fa48("799") ? confirmAction?.type !== "delete-category" : stryMutAct_9fa48("798") ? false : stryMutAct_9fa48("797") ? true : (stryCov_9fa48("797", "798", "799"), (stryMutAct_9fa48("800") ? confirmAction.type : (stryCov_9fa48("800"), confirmAction?.type)) === (stryMutAct_9fa48("801") ? "" : (stryCov_9fa48("801"), "delete-category")))) ? stryMutAct_9fa48("802") ? "" : (stryCov_9fa48("802"), "Delete") : stryMutAct_9fa48("803") ? "" : (stryCov_9fa48("803"), "Remove")} variant="danger" onConfirm={handleConfirmDelete} onCancel={stryMutAct_9fa48("804") ? () => undefined : (stryCov_9fa48("804"), () => setConfirmAction(null))} />
    </div>;
  }
}