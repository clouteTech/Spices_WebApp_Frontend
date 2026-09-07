// import React, { useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Box, Typography, Paper, TextField } from "@mui/material";

// const Table = ({
//   rows,
//   columns,
//   pagination,
//   totalElements,
//   onPageChange,
//   onPageSizeChange,
//   loading = false,
// }) => {
//   return (
//     <>
//       {/* Wrapped inside Paper for better dashboard look */}
//       {/* <Paper
//         elevation={3}
//         sx={{
//           borderRadius: 1,
//           overflowX: "auto",
//           overflowY: "hidden",
//           whiteSpace: "nowrap",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.41)",
//           p: 1,
//         }}
//       > */}
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         rowCount={totalElements}
//         paginationMode="server"
//         disableRowSelectionOnClick
//         loading={loading}
//         paginationModel={{
//           page: pagination.page,
//           pageSize: pagination.size,
//         }}
//         onPaginationModelChange={(model) => {
//           if (model.page !== pagination.page) onPageChange(model.page);
//           if (model.pageSize !== pagination.size)
//             onPageSizeChange(model.pageSize);
//         }}
//         pageSizeOptions={[10, 25, 50, 100]}
//         sx={{
//           border: "none",
//           minWidth: "1000px",

//           /* Make header fully dark */
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: "#2d2f33",
//             borderBottom: "none",
//             height: 55,
//             color: "#fff",
//           },

//           /* Fix right side white space */
//           "& .MuiDataGrid-columnHeadersInner": {
//             backgroundColor: "#2d2f33",
//           },
//           "& .MuiDataGrid-scrollArea": {
//             backgroundColor: "#2d2f33",
//           },

//           /* Header cells */
//           "& .MuiDataGrid-columnHeader": {
//             backgroundColor: "#2d2f33",
//             color: "#fff",
//             fontWeight: "bold",
//             fontSize: "1rem",
//           },

//           /* Smooth rounded top corners */
//           "& .MuiDataGrid-main": {
//             borderTopLeftRadius: "8px",
//             borderTopRightRadius: "8px",
//             overflow: "hidden",
//           },

//           "& .MuiDataGrid-columnSeparator": {
//             display: "none",
//           },

//           /* Rows styling */
//           "& .MuiDataGrid-row": {
//             transition: "all 0.2s ease",
//           },
//           "& .MuiDataGrid-row:nth-of-type(odd)": {
//             backgroundColor: "#fafafa",
//           },
//           "& .MuiDataGrid-row:hover": {
//             backgroundColor: "#f0f4ff",
//           },

//           /* Cells */
//           "& .MuiDataGrid-cell": {
//             color: "#444",
//             fontSize: "0.95rem",
//             borderBottom: "1px solid #eee",
//           },

//           /* Footer styling */
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "1px solid #eee",
//             backgroundColor: "#f3f4f6",
//           },

//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: "#fff",
//           },
//         }}
//       />
//       {/* </Paper> */}
//     </>
//   );
// };

// export default Table;



import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import "./Table.css";

const Table = ({
  value = [],
  columns = [],
  loading = false,
  pagination,
  totalRecords = 0,
  onPageChange,
  header = null,
  globalFilter = "",
  enablePagination = true,
  dataKey = "id"
}) => {
  // ✅ PrimeReact filters state
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  // ✅ Sync parent globalFilter → PrimeReact filter
  useEffect(() => {
    setFilters({
      global: {
        value: globalFilter,
        matchMode: FilterMatchMode.CONTAINS,
      },
    });
  }, [globalFilter]);
  return (
    <DataTable
      value={value}
      dataKey="id"
      loading={loading}
      header={header}
      filters={filters} // ✅ IMPORTANT
      globalFilterFields={columns // ✅ auto-pick searchable fields
        .filter((c) => c.field)
        .map((c) => c.field)}
      showGridlines
      className="custom-datatable"
      emptyMessage="No records found"
      responsiveLayout="scroll"
      scrollable
      scrollHeight="400px"
      {...(enablePagination && {
        paginator: true,
        // lazy: true,
        rows: pagination.size,
        first: pagination.first,
        totalRecords: totalRecords,
        onPage: (e) =>
          onPageChange({
            page: e.page,
            size: e.rows,
            first: e.first,
          }),
        rowsPerPageOptions: [10, 25, 50, 100],
      })}
    >
      {columns.map((col, index) => (
        <Column key={index} {...col} />
      ))}
    </DataTable>
  );
};

export default Table;

// import React from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";

// const Table = ({
//   value = [],
//   columns = [],
//   filters,
//   setFilters,
//   header,
//   globalFilterFields = [],
//   loading = false,
//   pagination,
//   totalRecords = 0,
//   onPageChange,
//   enablePagination = true,
// }) => {
//   return (
//     <DataTable
//       value={value}
//       dataKey="id"
//       header={header}
//       filters={filters}
//       onFilter={(e) => setFilters(e.filters)} // 🔥 REQUIRED
//       globalFilterFields={globalFilterFields}
//       loading={loading}
//       showGridlines
//       stripedRows
//       paginator={enablePagination}
//       lazy={enablePagination}
//       rows={pagination?.size}
//       first={pagination?.first}
//       totalRecords={totalRecords}
//       onPage={(e) =>
//         onPageChange?.({
//           page: e.page,
//           size: e.rows,
//           first: e.first,
//         })
//       }
//       emptyMessage="No records found"
//     >
//       {columns.map((col, i) => (
//         <Column key={i} {...col} />
//       ))}
//     </DataTable>
//   );
// };

// export default Table;

