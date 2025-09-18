import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../features/cart/cartSlice";
import { Outlet, Link } from "react-router-dom";

const Cart = () => {
  const cartData = useSelector((state) => state.cart.items);
  const cartTotal= useSelector(selectCartTotal)
  console.log(cartTotal);
  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Grid
          container
          sx={{
            my: 2,
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {cartData?.map((elem) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={elem.id}>
                <Paper elevation={3} sx={{ m:1, p: 2, display:"flex", flexDirection:{xs:"column",sm:"row",md:"row"} }}>
                  <Box
                    component="img"
                    src={elem.image_url}
                    alt="product_Image"
                    sx={{
                      m:1,
                      p:1,
                      width:"100px",
                      height:"100px",
                      borderRadius: 2,
                    }}
                  />
                  <Box sx={{m:1,p:1, width:"100px"}}>{elem.name}</Box>
                  <Box sx={{m:1,p:1, width:"80px"}}>{elem.price}</Box>
                  <Box sx={{m:1,p:1}}>
                    <Button>
                        -
                    </Button>
                    {elem.quantity}
                    <Button>
                        +
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Typography sx={{fontWeight:700 , mb:3}}>Total Cart Value: {cartTotal}</Typography>
          </Box>
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
           <Button component={Link} to="/checkout" sx={{mb:3}}>Checkout</Button>
          </Box>
      </Paper>
    </Container>
  );
};

export default Cart;
