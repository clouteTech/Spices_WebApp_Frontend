// // src/components/common/GlobalDataGrid.jsx
// import React, { useRef, useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Collapse,
//   TablePagination,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// // ================= Styled Components =================

// const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
//   borderRadius: theme.shape.borderRadius * 2,
//   border: `1px solid ${theme.palette.divider}`,
// }));

// const StyledTableHead = styled(TableHead)(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? theme.palette.background.default
//       : "#f8fafc",
// }));

// const ResizableHeaderCell = styled(TableCell)(({ width }) => ({
//   backgroundColor:"#141411ff",
//   color:"#ffffff",
//   position: "relative",
//   width,
//   whiteSpace: "nowrap",
//   overflow: "hidden",
// }));

// const ResizeHandle = styled("div")(({ theme }) => ({
//   position: "absolute",
//   right: 0,
//   top: "20%",
//   bottom: "20%",
//   width: "8px",
//   cursor: "col-resize",
//   "&::after": {
//     content: '""',
//     position: "absolute",
//     right: "3px",
//     top: 0,
//     bottom: 0,
//     width: "1px",
//     backgroundColor: theme.palette.divider,
//   },
// }));

// const BodyCell = styled(TableCell)(() => ({
//   whiteSpace: "nowrap",
//   overflow: "hidden",
//   textOverflow: "ellipsis",
// }));

// // ================= Component =================

// const GlobalDataGrid = ({
//   columns = [],
//   rows = [],
//   renderExpandedRow,
//   pagination = true,
//   rowsPerPageOptions = [5, 10, 25],
// }) => {
//   const tableRef = useRef(null);
//   const activeIndex = useRef(null);

//   const [expandedRowId, setExpandedRowId] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

//   const [cols, setCols] = useState(columns);

//   // ---------- Column Resize ----------
//   const handleMouseDown = (index, e) => {
//     activeIndex.current = index;
//     const startX = e.pageX;
//     const startWidth = cols[index].width;
//     const tableWidth = tableRef.current.offsetWidth;

//     const onMouseMove = (ev) => {
//       const diff = ((ev.pageX - startX) / tableWidth) * 100;
//       setCols((prev) => {
//         const updated = [...prev];
//         updated[index] = {
//           ...updated[index],
//           width: Math.max(5, startWidth + diff),
//         };
//         return updated;
//       });
//     };

//     const onMouseUp = () => {
//       activeIndex.current = null;
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseup", onMouseUp);
//     };

//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseup", onMouseUp);
//   };

//   // ---------- Pagination ----------
//   const visibleRows = pagination
//     ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//     : rows;

//   if (!rows.length) {
//     return (
//       <Box p={3} textAlign="center">
//         <Typography color="text.secondary">No records found</Typography>
//       </Box>
//     );
//   }

//   return (
//     <StyledTableContainer component={Paper}>
//       <Table ref={tableRef} sx={{ tableLayout: "fixed",color:"black" }}>
//         <StyledTableHead>
//           <TableRow>
//             {cols.map((col, index) => (
//               <ResizableHeaderCell key={col.field} width={`${col.width}%`}>
//                 {col.header}
//                 <ResizeHandle onMouseDown={(e) => handleMouseDown(index, e)} />
//               </ResizableHeaderCell>
//             ))}
//           </TableRow>
//         </StyledTableHead>

//         <TableBody>
//           {visibleRows.map((row, rowIndex) => (
//             <React.Fragment key={row.id || rowIndex}>
//               <TableRow
//                 hover
//                 onClick={() =>
//                   setExpandedRowId(expandedRowId === row.id ? null : row.id)
//                 }
//               >
//                 {cols.map((col) => (
//                   <BodyCell key={col.field}>
//                     {col.render
//                       ? col.render(row, { rowIndex })
//                       : row[col.field] ?? "-"}
//                   </BodyCell>
//                 ))}
//               </TableRow>

//               {renderExpandedRow && (
//                 <TableRow>
//                   <TableCell colSpan={cols.length} sx={{ p: 0 }}>
//                     <Collapse in={expandedRowId === row.id}>
//                       <Box p={2}>{renderExpandedRow(row)}</Box>
//                     </Collapse>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </React.Fragment>
//           ))}
//         </TableBody>
//       </Table>

//       {pagination && (
//         <TablePagination
//           component="div"
//           count={rows.length}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={(e, p) => setPage(p)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//           rowsPerPageOptions={rowsPerPageOptions}
//         />
//       )}
//     </StyledTableContainer>
//   );
// };

// GlobalDataGrid.propTypes = {
//   columns: PropTypes.array.isRequired,
//   rows: PropTypes.array.isRequired,
//   renderExpandedRow: PropTypes.func,
// };

// export default GlobalDataGrid;

// src/ui/GlobalDataGrid.jsx
import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Paginator } from "primereact/paginator";

/* =========================
   STYLES
========================= */

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  overflow: "hidden",
}));

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#2f343b",
  color: "#ffffff",
  fontWeight: 600,
  fontSize: "14px",
  padding: "14px 16px",
}));

const BodyCell = styled(TableCell)(() => ({
  fontSize: "14px",
  padding: "14px 16px",
  color: "#374151",
}));

/* =========================
   COMPONENT
========================= */

const GlobalDataGrid = ({
  columns = [],
  rows = [],              // current page rows (from API)
  pagination,             // { first, rows }
  totalRecords = 0,       // total count from backend
  onPageChange,
  loading = false,
}) => {
  const { first = 0, rows: pageSize = 10 } = pagination;

  if (!rows.length && !loading) {
    return (
      <Box p={3} textAlign="center">
        <Typography color="text.secondary">
          No records found
        </Typography>
      </Box>
    );
  }

  return (
    <StyledTableContainer component={Paper}>
      {/* TABLE */}
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <HeaderCell key={index}>
                {col.header}
              </HeaderCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={row.id || rowIndex} hover>
              {columns.map((col, colIndex) => (
                <BodyCell key={colIndex}>
                  {col.render
                    ? col.render(row, { rowIndex })
                    : row[col.field] ?? "-"}
                </BodyCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION (PRIMEREACT – SAME AS OLD TABLE) */}
      <Box p={2} display="flex" justifyContent="center">
        <Paginator
          first={first}
          rows={pageSize}
          totalRecords={totalRecords}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onPageChange={(e) =>
            onPageChange({
              first: e.first,
              rows: e.rows,
            })
          }
        />
      </Box>
    </StyledTableContainer>
  );
};

/* =========================
   PROPS
========================= */

GlobalDataGrid.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  pagination: PropTypes.shape({
    first: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
  }).isRequired,
  totalRecords: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default GlobalDataGrid;




