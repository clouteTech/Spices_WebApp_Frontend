import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { LocalMallOutlined } from "@mui/icons-material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Remove } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const navigate = useNavigate();

  const total = Number(
    cartItems
      .filter((item) =>
        selectedItems.includes(`${item.id}-${item.selectedSize}`)
      )
      .reduce((sum, item) => sum + item.price * item.quantity*item.selectedSize, 0)
      .toFixed(2)
  );

  const subtotal = Number(
    cartItems
      .filter((item) =>
        selectedItems.includes(`${item.id}-${item.selectedSize}`)
      )
      .reduce((sum, item) => sum + item.price * item.quantity * item.selectedSize, 0)
      .toFixed(2)
  );

  const handleSelect = (itemKey) => {
    setSelectedItems((prev) =>
      prev.includes(itemKey)
        ? prev.filter((key) => key !== itemKey)
        : [...prev, itemKey]
    );
  };

  const handleConfirm = () => {
    setShowSummaryModal(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your Cart is Empty.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => {
              const itemKey = `${item.id}-${item.selectedSize}`;
              return (
                <Card key={itemKey} sx={{ mb: 2 }}>
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={selectedItems.includes(itemKey)}
                      onChange={() => handleSelect(itemKey)}
                    />
                    <CardMedia
                      component="img"
                      image={item.img}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        objectFit: "cover",
                        mr: 2,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2">
                        Qty:{item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Size:{item.selectedSize}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Price:₹{(item.price * item.quantity * item.selectedSize).toFixed(2)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {item.quantity === 1 ? (
                        <IconButton
                          color="error"
                          onClick={() =>
                            removeFromCart(item.id, item.selectedSize)
                          }
                        >
                          <DeleteOutlineOutlined />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() =>
                            decreaseQuantity(item.id, item.selectedSize)
                          }
                        >
                          <Remove />
                        </IconButton>
                      )}
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        onClick={() =>
                          increaseQuantity(item.id, item.selectedSize)
                        }
                      >
                        <Add />
                      </IconButton>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() =>
                          removeFromCart(item.id, item.selectedSize)
                        }
                      >
                        Remove
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </List>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Subtotal(selected):₹{total.toFixed(2)}
          </Typography>
          <Typography variant="h6">Total:₹{total.toFixed(2)}</Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<LocalMallOutlined />}
              disabled={selectedItems.length === 0}
              onClick={() => setShowSummaryModal(true)}
            >
              Proceed to Buy
            </Button>
          </Box>

          <Dialog
            open={showSummaryModal}
            onClose={() => setShowSummaryModal(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Cart Summary</DialogTitle>
            <DialogContent dividers>
              <List>
                {cartItems
                  .filter((item) =>
                    selectedItems.includes(`${item.id}-${item.selectedSize}`)
                  )
                  .map((item) => (
                    <React.Fragment key={`${item.id}-${item.selectedSize}`}>
                      <ListItem>
                        <ListItemText
                          primary={`${item.name}-${item.selectedSize}*${item.quantity}`}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
              </List>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total:₹{subtotal.toFixed(2)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setShowSummaryModal(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                variant="contained"
                color="success"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineOutlined />}
            sx={{ mt: 3 }}
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
