import { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridReadyEvent } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { CsvExportModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { RowStyleModule } from "ag-grid-community";
import { useUIStore } from "../stores/uiStore";

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule, RowStyleModule]);

const darkGridVars = `
  --ag-background-color: #1f2937;
  --ag-foreground-color: #d1d5db;
  --ag-border-color: #374151;
  --ag-secondary-border-color: #4b5563;
  --ag-header-background-color: #111827;
  --ag-header-foreground-color: #9ca3af;
  --ag-tooltip-background-color: #1f2937;
  --ag-odd-row-background-color: #1a2332;
  --ag-control-panel-background-color: #1f2937;
  --ag-subheader-background-color: #111827;
  --ag-input-disabled-background-color: #374151;
  --ag-disabled-foreground-color: rgba(209, 213, 219, 0.5);
  --ag-chip-background-color: rgba(209, 213, 219, 0.07);
  --ag-input-disabled-border-color: rgba(55, 65, 81, 0.3);
  --ag-input-disabled-background-color: rgba(55, 65, 81, 0.15);
`;

interface Props {
  rows: unknown[];
  colDefs: ColDef[];
  height?: number;
  exportFilename?: string;
  additionalButtons?: React.ReactNode;
  rowClassRules?: Record<string, (params: { data: unknown }) => boolean>;
}

export default function DataGrid({ rows, colDefs, height = 400, exportFilename = "export", additionalButtons, rowClassRules }: Props) {
  const gridRef = useRef<AgGridReact>(null);
  const theme = useUIStore((s) => s.theme);
  const isDark = useMemo(() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, [theme]);

  const handleExport = () => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: `${exportFilename}.csv`,
      allColumns: true,
      processCellCallback: (params) => {
        if (params.column.getColDef().field === "categoryId") {
          return params.value || "";
        }
        return params.value;
      },
    });
  };

  return (
    <div>
      {isDark && <style>{`.ag-theme-alpine-dark { ${darkGridVars} }`}</style>}
      <div className="flex justify-end gap-2 mb-2">
        {additionalButtons}
        <button
          onClick={handleExport}
          className="px-3 py-1.5 bg-green-600 text-white rounded-md text-xs font-semibold cursor-pointer hover:bg-green-700 transition-colors"
        >
          Export CSV
        </button>
      </div>
      <div className={isDark ? "ag-theme-alpine-dark" : "ag-theme-alpine"} style={{ height, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rows}
          columnDefs={colDefs}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 80,
          }}
          onGridReady={(params: GridReadyEvent) => params.api.sizeColumnsToFit()}
          domLayout="autoHeight"
          suppressMenuHide
          rowClassRules={rowClassRules}
        />
      </div>
    </div>
  );
}
