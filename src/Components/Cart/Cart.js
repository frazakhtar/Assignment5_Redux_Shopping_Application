import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartTotal,
  increaseQuantity,
  decreaseQuantity,
  emptyTheCart,
} from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Cart = ({ button }) => {
  const cartData = useSelector((state) => state.cart.items);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  const cardWidth = 250;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography
        variant="h5"
        component="h5"
        sx={{
          pt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        My Cart
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {cartData?.map((elem) => (
          <Grid
            item
            key={elem.id}
            xs={12}
            sm={6}
            md="auto"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Paper
              elevation={3}
              sx={{
                width: cardWidth,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 1,
              }}
            >
              <Box
                component="img"
                src={elem.image_url}
                alt="product_Image"
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              <Typography align="center" sx={{ fontWeight: 600 }}>
                {elem.name}
              </Typography>
              <Typography align="center" sx={{ mt: 1 }}>
                {elem.price}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Button
                  sx={{
                    minWidth: "30px",
                    p: "2px 6px",
                    mr: 1,
                    fontSize: "0.8rem",
                    color: "#000000",
                    backgroundColor: "#f6e7e7ff",
                    fontWeight: "600",
                  }}
                  onClick={() => dispatch(decreaseQuantity(elem.id))}
                >
                  -
                </Button>
                {elem.quantity}
                <Button
                  sx={{
                    minWidth: "30px",
                    p: "2px 6px",
                    ml: 1,
                    fontSize: "0.8rem",
                    color: "#000000",
                    backgroundColor: "#f6e7e7ff",
                    fontWeight: "600",
                  }}
                  onClick={() => dispatch(increaseQuantity(elem.id))}
                >
                  +
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
        <Typography sx={{ fontWeight: 700, mb: 3 }}>
          Total Cart Value: {cartTotal.toFixed(2)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {button ? (
          button
        ) : (
          <Button
            disabled={cartData.length === 0}
            component={Link}
            to="/checkout"
            fullWidth={{ xs: true, sm: false }}
            sx={{
              mb: 2,
              px: 3,
              py: 1,
              fontWeight: "600",
              borderRadius: 2,
              color: "#000000",
              backgroundColor: "#f6e7e7ff",
            }}
          >
            Checkout
          </Button>
        )}

        <Button
          disabled={cartData.length === 0}
          fullWidth={{ xs: true, sm: false }}
          sx={{
            mb: 2,
            px: 3,
            py: 1,
            fontWeight: "600",
            borderRadius: 2,
            color: "#000000",
            backgroundColor: "#f6e7e7ff",
          }}
          onClick={() => dispatch(emptyTheCart())}
        >
          Empty Cart
        </Button>
      </Box>
    </Paper>
  );
};

export default Cart;
