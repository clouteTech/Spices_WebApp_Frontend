// import React, { useEffect, useState } from "react";
// import AddProductForm from "./AddProductForm";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Box,
//   DialogContent,
// } from "@mui/material";
// import Table from "./Table";

// const AddProduct = () => {
//   const [open, setOpen] = useState(false);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const stored = localStorage.getItem("products");
//     if (stored) setProducts(JSON.parse(stored));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("products", JSON.stringify(products));
//   }, [products]);

//   const handleAddProduct = (products) => {
//     setProducts((prev) => [...prev, { ...products, id: Date.now() }]);
//     setOpen(false);
//   };

//   const columns = [
//     { field: "id", headerName: "S.No", width: 90 },
//     { field: "productCode", headerName: "Product Code", flex: 1 },
//     { field: "productName", headerName: "Product Name", flex: 1.5 },
//     { field: "categoryName", headerName: "Category Name", flex: 1.2 },
//     { field: "shelfLife", headerName: "Shelf Life", flex: 1 },
//     { field: "description", headerName: "Description", flex: 2 },
//     {
//       field: "status",
//       headerName: "Status",
//       flex: 1,
//       renderCell: (params) => (params.value ? "Active" : "Inactive"),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 0.7,
//       sortable: false,
//       renderCell: (params) => (
//         <>
//           <IconButton onClick={(e) => handleMenuOpen(e, params.row.id)}>
//             <MoreVertIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={menuRowId === params.row.id}
//             onClose={handleMenuClose}
//           >
//             <MenuItem onClick={() => handleEditClick(params.row)}>
//               <BorderColorTwoToneIcon sx={{ mr: 1 }} />
//               Edit
//             </MenuItem>
//             <MenuItem onClick={() => handleDeleteClick(params.row.productId)}>
//               <DeleteOutlineTwoToneIcon sx={{ mr: 1 }} />
//               Delete
//             </MenuItem>
//           </Menu>
//         </>
//       ),
//     },
//   ];


//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>
//         Product Master
//       </Typography>
//       <Button variant="contained" onClick={() => setOpen(true)}>
//         Product Master
//       </Button>

//       <Grid container spacing={2} sx={{ mt: 2 }}>
//         {products.map((prod) => (
//           <Grid item xs={12} sm={6} md={4} key={prod.id}>
//             <Card>
//               {prod.image && (
//                 <CardMedia component="img" height="140" image={prod.image} alt={prod.name} />
//               )}
//               <CardContent>
//                 <Typography variant="h6">{prod.name}</Typography>
//                 <Typography variant="body2">{prod.description}</Typography>
//                 <Typography variant="subtitle2">
//                   Size Type:{prod.sizeType}
//                 </Typography>
//                 <Typography variant="subtitle1">₹{prod.price}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       {/* <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>Add Product</DialogTitle>
//         <DialogContent>
//           <AddProductForm
//             onSave={handleAddProduct}
//             onCancel={() => setOpen(false)}
//           />
//         </DialogContent>
//       </Dialog> */}
//       <Table rows={AddProduct} columns={columns} pageSize={5} />
//     </Box>
//   );
// };

// export default AddProduct;



