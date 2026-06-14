import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridReadyEvent } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { CsvExportModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { RowStyleModule } from "ag-grid-community";
ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule, RowStyleModule]);

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
      <div className="flex justify-end gap-2 mb-2">
        {additionalButtons}
        <button
          onClick={handleExport}
          className="px-3 py-1.5 bg-green-600 text-white rounded-md text-xs font-semibold cursor-pointer hover:bg-green-700 transition-colors"
        >
          Export CSV
        </button>
      </div>
      <div className="ag-theme-alpine" style={{ height, width: "100%" }}>
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
