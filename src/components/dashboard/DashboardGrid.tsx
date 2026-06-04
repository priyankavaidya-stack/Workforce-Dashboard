import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
  type ValueFormatterParams,
  type RowClickedEvent,
  type ICellRendererParams,
} from "ag-grid-community";
import { useMemo, useRef, useState } from "react";
import { Button, Chip, Rating, Stack, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { filteredProvidersAtom } from "../../atoms/employeeAtoms";
import type { Provider } from "../../types/employee";
import ProviderDrawer from "./ProviderDrawer";
import { themeAtom } from "../../atoms/themeAtom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const DashboardGrid = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [selectedProvider, setSelectedProvider] =
    useState<Provider | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] =
    useState(false);

  const rowData =
    useAtomValue(
      filteredProvidersAtom
    );
  const mode = useAtomValue(themeAtom);

  const handleExportCsv = () => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: "employee-directory.csv",
      allColumns: true,
    });
  };

  const handleRowClick = (
    event: RowClickedEvent<Provider>
  ) => {
    if (!event.data) {
      return;
    }

    setSelectedProvider(event.data);
    setIsDrawerOpen(true);
  };

  const columnDefs = useMemo<
    ColDef[]
  >(
    () => [
      {
        headerName: "Employee",
        field: "firstName",
        pinned: "left",
        minWidth: 220,
        valueGetter: (params) =>
          `${params.data.firstName} ${params.data.lastName}`,
        cellStyle: {
          fontWeight: 600,
        },
      },
      {
        field: "department",
        minWidth: 150,
      },
      {
        field: "position",
        minWidth: 220,
      },
      {
        field: "location",
      },
      {
        field: "salary",
        minWidth: 140,
        valueFormatter: (
          params: ValueFormatterParams
        ) => `$${Number(params.value ?? 0).toLocaleString()}`,
      },
      {
        field: "performanceRating",
        headerName: "Performance",
        minWidth: 160,
        cellRenderer: (
          params: ICellRendererParams
        ) => (
          <Rating
            value={Number(params.value ?? 0)}
            precision={0.1}
            readOnly
          />
        ),
      },
      {
        field: "projectsCompleted",
        headerName: "Projects",
      },
      {
        field: "skills",
        minWidth: 220,
        valueFormatter: (
          params: ValueFormatterParams
        ) => Array.isArray(params.value) ? params.value.join(", ") : "",
      },
      {
        field: "manager",
        minWidth: 180,
        valueFormatter: (
          params: ValueFormatterParams
        ) => params.value ?? "Self-managed",
      },
      {
        headerName: "Status",
        field: "isActive",
        cellRenderer: (
          params: ICellRendererParams
        ) => (
          <Chip
            label={params.value ? "Active" : "Inactive"}
            color={
              params.value
                ? "success"
                : "error"
            }
            size="small"
          />
        ),
      },
      {
        field: "hireDate",
        headerName: "Hire Date",
        minWidth: 130,
        valueFormatter: (
          params: ValueFormatterParams
        ) => {
          const value = String(params.value ?? "");
          if (!value) {
            return "";
          }

          return new Date(value).toLocaleDateString();
        },
      },
      {
        field: "email",
        minWidth: 250,
      },
      {
        field: "age",
      },
    ],
    []
  );

  const defaultColDef =
    useMemo(
      () => ({
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true,
        flex: 1,
        minWidth: 120,
        suppressHeaderMenuButton: true,
      }),
      []
    );

  return (
    <>
      <Stack
        direction="row"
        sx={{ mb: 2, justifyContent: "space-between", alignItems: "center", gap: 2 }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          Employee Data
        </Typography>

        <Button
          variant="contained"
          onClick={handleExportCsv}
          disabled={rowData.length === 0}
        >
          Export CSV
        </Button>
      </Stack>

      <div
        className={
          mode === "dark"
            ? "ag-theme-quartz-dark"
            : "ag-theme-quartz"
        }
        style={{
          height: 620,
          width: "100%",
          borderRadius: 12,
          overflow: "hidden",
          border:
            mode === "dark"
              ? "1px solid #234055"
              : "1px solid #dce8ee",
          boxShadow:
            mode === "dark"
              ? "inset 0 0 0 1px rgba(130, 170, 255, 0.08)"
              : "inset 0 0 0 1px rgba(15, 118, 110, 0.08)",
          ["--ag-font-family" as string]: '"Avenir Next", "Manrope", "Segoe UI", sans-serif',
          ["--ag-header-height" as string]: "44px",
          ["--ag-row-height" as string]: "46px",
          ["--ag-border-radius" as string]: "12px",
        }}
      >
        <AgGridReact
          ref={gridRef}
          theme="legacy"
          modules={[AllCommunityModule]}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          overlayNoRowsTemplate="<span style='padding: 16px; color: #4b6578;'>No employees match the selected filters.</span>"
          onRowClicked={handleRowClick}
          quickFilterText={""}
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          animateRows
          suppressCellFocus
          rowSelection="multiple"
        />
      </div>

      <ProviderDrawer
        open={isDrawerOpen}
        provider={selectedProvider}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

export default DashboardGrid;