import PropTypes from "prop-types";

// material-ui
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// third-party
import { NumericFormat } from "react-number-format";

// ==============================|| DATA ||============================== //

function createData(orderId, spiceName, quantity, status, price) {
  return { orderId, spiceName, quantity, status, price };
}

const rows = [
  createData(1001, "Cinnamon Stick", 25, 1, 2500),
  createData(1002, "Turmeric Powder", 40, 0, 3200),
  createData(1003, "Black Pepper", 30, 1, 2800),
  createData(1004, "Cardamom", 15, 2, 4500),
  createData(1005, "Cloves", 20, 1, 3100),
];

// ==============================|| SORT FUNCTIONS ||============================== //

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

// ==============================|| TABLE HEAD ||============================== //

const headCells = [
  { id: "orderId", label: "Order ID", align: "left" },
  { id: "spiceName", label: "Spice Name", align: "left" },
  { id: "quantity", label: "Quantity", align: "right" },
  { id: "status", label: "Status", align: "left" },
  { id: "price", label: "Price (₹)", align: "right" },
];

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((head) => (
          <TableCell key={head.id} align={head.align}>
            {head.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| STATUS ||============================== //

function OrderStatus({ status }) {
  let color;
  let label;

  switch (status) {
    case 0:
      color = "orange";
      label = "Pending";
      break;
    case 1:
      color = "green";
      label = "Delivered";
      break;
    case 2:
      color = "red";
      label = "Cancelled";
      break;
    default:
      color = "gray";
      label = "Unknown";
  }

  return <Typography sx={{ color }}>{label}</Typography>;
}

// ==============================|| MAIN TABLE ||============================== //

export default function OrdersTable() {
  const order = "asc";
  const orderBy = "orderId";

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table>
          <OrderTableHead />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row) => (
              <TableRow key={row.orderId} hover>
                <TableCell>
                  <Link color="primary">#{row.orderId}</Link>
                </TableCell>

                <TableCell>{row.spiceName}</TableCell>

                <TableCell align="right">{row.quantity}</TableCell>

                <TableCell>
                  <OrderStatus status={row.status} />
                </TableCell>

                <TableCell align="right">
                  <NumericFormat
                    value={row.price}
                    displayType="text"
                    thousandSeparator
                    prefix="₹"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderStatus.propTypes = {
  status: PropTypes.number,
};
