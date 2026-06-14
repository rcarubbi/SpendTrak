import { useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridReadyEvent } from "ag-grid-community";
import { ModuleRegistry, themeQuartz } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { CsvExportModule } from "ag-grid-community";
import { RowStyleModule } from "ag-grid-community";

import { useUIStore } from "../stores/uiStore";

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule, RowStyleModule]);

const myTheme = themeQuartz
  .withParams(
    {
      backgroundColor: "#ffffff",
      foregroundColor: "#000000",
      headerBackgroundColor: "#ffffff",
      borderColor: "#e0e0e0",
      oddRowBackgroundColor: "#f8f9fa",
      rowHoverColor: "#f0f4f8",
      browserColorScheme: "light",
    },
    "light"
  )
  .withParams(
    {
      backgroundColor: "#0a0f1a",
      foregroundColor: "#ffffff",
      headerBackgroundColor: "#0a0f1a",
      headerTextColor: "#ffffff",
      borderColor: "#1e293b",
      oddRowBackgroundColor: "#060b14",
      rowHoverColor: "#1e293b",
      browserColorScheme: "dark",
    },
    "dark"
  );

interface Props {
  rows: unknown[];
  colDefs: ColDef[];
  height?: number;
  exportFilename?: string;
  additionalButtons?: React.ReactNode;
  rowClassRules?: Record<string, (params: { data: unknown }) => boolean>;
  loading?: boolean;
  fillHeight?: boolean;
}

export default function DataGrid({ rows, colDefs, height = 400, exportFilename = "export", additionalButtons, rowClassRules, loading, fillHeight }: Props) {
  const gridRef = useRef<AgGridReact>(null);
  const gridReadyRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = useUIStore((s) => s.theme === "dark" || (s.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.dataset.agThemeMode = isDark ? "dark" : "light";
  }, [isDark]);

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

  const onGridReady = (params: GridReadyEvent) => {
    gridReadyRef.current = true;
    params.api.sizeColumnsToFit();
  };

  return (
    <div className={fillHeight ? "flex flex-col min-h-0 flex-1" : undefined}>
      <div className="flex justify-end gap-2 mb-2 shrink-0">
        {additionalButtons}
        <button
          onClick={handleExport}
          className="px-3 py-1.5 bg-green-600 text-white rounded-md text-xs font-semibold cursor-pointer hover:bg-green-700 transition-colors"
        >
          Export CSV
        </button>
      </div>
      <div
        ref={containerRef}
        className={fillHeight ? "min-h-0 flex-1" : undefined}
        style={fillHeight ? undefined : { height, width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          theme={myTheme}
          rowData={rows}
          columnDefs={colDefs}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 80,
          }}
          onGridReady={onGridReady}
          domLayout="normal"
          suppressMenuHide
          rowClassRules={rowClassRules}
          loading={loading}
        />
      </div>
    </div>
  );
}
