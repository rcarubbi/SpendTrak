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
import { useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridReadyEvent } from "ag-grid-community";
import { ModuleRegistry, themeQuartz } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { CsvExportModule } from "ag-grid-community";
import { RowStyleModule } from "ag-grid-community";
import { useUIStore } from "../stores/uiStore";
ModuleRegistry.registerModules(stryMutAct_9fa48("226") ? [] : (stryCov_9fa48("226"), [ClientSideRowModelModule, CsvExportModule, RowStyleModule]));
const myTheme = themeQuartz.withParams(stryMutAct_9fa48("227") ? {} : (stryCov_9fa48("227"), {
  backgroundColor: stryMutAct_9fa48("228") ? "" : (stryCov_9fa48("228"), "#ffffff"),
  foregroundColor: stryMutAct_9fa48("229") ? "" : (stryCov_9fa48("229"), "#000000"),
  headerBackgroundColor: stryMutAct_9fa48("230") ? "" : (stryCov_9fa48("230"), "#ffffff"),
  borderColor: stryMutAct_9fa48("231") ? "" : (stryCov_9fa48("231"), "#e0e0e0"),
  oddRowBackgroundColor: stryMutAct_9fa48("232") ? "" : (stryCov_9fa48("232"), "#f8f9fa"),
  rowHoverColor: stryMutAct_9fa48("233") ? "" : (stryCov_9fa48("233"), "#f0f4f8"),
  browserColorScheme: stryMutAct_9fa48("234") ? "" : (stryCov_9fa48("234"), "light")
}), stryMutAct_9fa48("235") ? "" : (stryCov_9fa48("235"), "light")).withParams(stryMutAct_9fa48("236") ? {} : (stryCov_9fa48("236"), {
  backgroundColor: stryMutAct_9fa48("237") ? "" : (stryCov_9fa48("237"), "#0a0f1a"),
  foregroundColor: stryMutAct_9fa48("238") ? "" : (stryCov_9fa48("238"), "#ffffff"),
  headerBackgroundColor: stryMutAct_9fa48("239") ? "" : (stryCov_9fa48("239"), "#0a0f1a"),
  headerTextColor: stryMutAct_9fa48("240") ? "" : (stryCov_9fa48("240"), "#ffffff"),
  borderColor: stryMutAct_9fa48("241") ? "" : (stryCov_9fa48("241"), "#1e293b"),
  oddRowBackgroundColor: stryMutAct_9fa48("242") ? "" : (stryCov_9fa48("242"), "#060b14"),
  rowHoverColor: stryMutAct_9fa48("243") ? "" : (stryCov_9fa48("243"), "#1e293b"),
  browserColorScheme: stryMutAct_9fa48("244") ? "" : (stryCov_9fa48("244"), "dark")
}), stryMutAct_9fa48("245") ? "" : (stryCov_9fa48("245"), "dark"));
interface Props {
  rows: unknown[];
  colDefs: ColDef[];
  height?: number;
  exportFilename?: string;
  additionalButtons?: React.ReactNode;
  rowClassRules?: Record<string, (params: {
    data: unknown;
  }) => boolean>;
  loading?: boolean;
  fillHeight?: boolean;
}
export default function DataGrid({
  rows,
  colDefs,
  height = 400,
  exportFilename = stryMutAct_9fa48("246") ? "" : (stryCov_9fa48("246"), "export"),
  additionalButtons,
  rowClassRules,
  loading,
  fillHeight
}: Props) {
  if (stryMutAct_9fa48("247")) {
    {}
  } else {
    stryCov_9fa48("247");
    const gridRef = useRef<AgGridReact>(null);
    const gridReadyRef = useRef(stryMutAct_9fa48("248") ? true : (stryCov_9fa48("248"), false));
    const containerRef = useRef<HTMLDivElement>(null);
    const isDark = useUIStore(stryMutAct_9fa48("249") ? () => undefined : (stryCov_9fa48("249"), s => stryMutAct_9fa48("252") ? s.theme === "dark" && s.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches : stryMutAct_9fa48("251") ? false : stryMutAct_9fa48("250") ? true : (stryCov_9fa48("250", "251", "252"), (stryMutAct_9fa48("254") ? s.theme !== "dark" : stryMutAct_9fa48("253") ? false : (stryCov_9fa48("253", "254"), s.theme === (stryMutAct_9fa48("255") ? "" : (stryCov_9fa48("255"), "dark")))) || (stryMutAct_9fa48("257") ? s.theme === "system" || window.matchMedia("(prefers-color-scheme: dark)").matches : stryMutAct_9fa48("256") ? false : (stryCov_9fa48("256", "257"), (stryMutAct_9fa48("259") ? s.theme !== "system" : stryMutAct_9fa48("258") ? true : (stryCov_9fa48("258", "259"), s.theme === (stryMutAct_9fa48("260") ? "" : (stryCov_9fa48("260"), "system")))) && window.matchMedia(stryMutAct_9fa48("261") ? "" : (stryCov_9fa48("261"), "(prefers-color-scheme: dark)")).matches)))));
    useEffect(() => {
      if (stryMutAct_9fa48("262")) {
        {}
      } else {
        stryCov_9fa48("262");
        const el = containerRef.current;
        if (stryMutAct_9fa48("265") ? false : stryMutAct_9fa48("264") ? true : stryMutAct_9fa48("263") ? el : (stryCov_9fa48("263", "264", "265"), !el)) return;
        el.dataset.agThemeMode = isDark ? stryMutAct_9fa48("266") ? "" : (stryCov_9fa48("266"), "dark") : stryMutAct_9fa48("267") ? "" : (stryCov_9fa48("267"), "light");
      }
    }, stryMutAct_9fa48("268") ? [] : (stryCov_9fa48("268"), [isDark]));
    const handleExport = () => {
      if (stryMutAct_9fa48("269")) {
        {}
      } else {
        stryCov_9fa48("269");
        stryMutAct_9fa48("270") ? gridRef.current.api.exportDataAsCsv({
          fileName: `${exportFilename}.csv`,
          allColumns: true,
          processCellCallback: params => {
            if (params.column.getColDef().field === "categoryId") {
              return params.value || "";
            }
            return params.value;
          }
        }) : (stryCov_9fa48("270"), gridRef.current?.api.exportDataAsCsv(stryMutAct_9fa48("271") ? {} : (stryCov_9fa48("271"), {
          fileName: stryMutAct_9fa48("272") ? `` : (stryCov_9fa48("272"), `${exportFilename}.csv`),
          allColumns: stryMutAct_9fa48("273") ? false : (stryCov_9fa48("273"), true),
          processCellCallback: params => {
            if (stryMutAct_9fa48("274")) {
              {}
            } else {
              stryCov_9fa48("274");
              if (stryMutAct_9fa48("277") ? params.column.getColDef().field !== "categoryId" : stryMutAct_9fa48("276") ? false : stryMutAct_9fa48("275") ? true : (stryCov_9fa48("275", "276", "277"), params.column.getColDef().field === (stryMutAct_9fa48("278") ? "" : (stryCov_9fa48("278"), "categoryId")))) {
                if (stryMutAct_9fa48("279")) {
                  {}
                } else {
                  stryCov_9fa48("279");
                  return stryMutAct_9fa48("282") ? params.value && "" : stryMutAct_9fa48("281") ? false : stryMutAct_9fa48("280") ? true : (stryCov_9fa48("280", "281", "282"), params.value || (stryMutAct_9fa48("283") ? "Stryker was here!" : (stryCov_9fa48("283"), "")));
                }
              }
              return params.value;
            }
          }
        })));
      }
    };
    const onGridReady = (params: GridReadyEvent) => {
      if (stryMutAct_9fa48("284")) {
        {}
      } else {
        stryCov_9fa48("284");
        gridReadyRef.current = stryMutAct_9fa48("285") ? false : (stryCov_9fa48("285"), true);
        params.api.sizeColumnsToFit();
      }
    };
    return <div className={fillHeight ? stryMutAct_9fa48("286") ? "" : (stryCov_9fa48("286"), "flex flex-col min-h-0 flex-1") : undefined}>
      <div className="flex justify-end gap-2 mb-2 shrink-0">
        {additionalButtons}
        <button onClick={handleExport} className="px-3 py-1.5 bg-green-600 text-white rounded-md text-xs font-semibold cursor-pointer hover:bg-green-700 transition-colors">
          Export CSV
        </button>
      </div>
      <div ref={containerRef} className={fillHeight ? stryMutAct_9fa48("287") ? "" : (stryCov_9fa48("287"), "min-h-0 flex-1") : undefined} style={fillHeight ? undefined : stryMutAct_9fa48("288") ? {} : (stryCov_9fa48("288"), {
        height,
        width: stryMutAct_9fa48("289") ? "" : (stryCov_9fa48("289"), "100%")
      })}>
        <AgGridReact ref={gridRef} theme={myTheme} rowData={rows} columnDefs={colDefs} defaultColDef={stryMutAct_9fa48("290") ? {} : (stryCov_9fa48("290"), {
          resizable: stryMutAct_9fa48("291") ? false : (stryCov_9fa48("291"), true),
          sortable: stryMutAct_9fa48("292") ? false : (stryCov_9fa48("292"), true),
          filter: stryMutAct_9fa48("293") ? false : (stryCov_9fa48("293"), true),
          flex: 1,
          minWidth: 80
        })} onGridReady={onGridReady} domLayout="normal" suppressMenuHide rowClassRules={rowClassRules} loading={loading} />
      </div>
    </div>;
  }
}