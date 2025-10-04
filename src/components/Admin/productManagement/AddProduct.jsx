import React, { useEffect, useState } from "react";
import AddProductForm from "./AddProductForm";
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  DialogContent,
} from "@mui/material";

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (products) => {
    setProducts((prev) => [...prev, { ...products, id: Date.now() }]);
    setOpen(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Manage Products
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Product
      </Button>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {products.map((prod) => (
          <Grid item xs={12} sm={6} md={4} key={prod.id}>
            <Card>
              {prod.image && (
                <CardMedia component="img" height="140" image={prod.image} alt={prod.name} />
              )}
              <CardContent>
                <Typography variant="h6">{prod.name}</Typography>
                <Typography variant="body2">{prod.description}</Typography>
                <Typography variant="subtitle2">
                  Size Type:{prod.sizeType}
                </Typography>
                <Typography variant="subtitle1">₹{prod.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <AddProductForm
            onSave={handleAddProduct}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddProduct;
