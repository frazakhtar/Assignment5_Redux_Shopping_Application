import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartTotal, increaseQuantity, decreaseQuantity, emptyTheCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartData = useSelector((state) => state.cart.items);
  const cartTotal= useSelector(selectCartTotal)
  const dispatch = useDispatch();
  return (
    <Container maxWidth="md" sx={{my:2}}>
      <Paper elevation={3}>
        <Box sx={{p:2,display:"flex", alignItems:"right", justifyContent:"right"}}>
          <Button  sx={{ color:"#000000",backgroundColor: "#f6e7e7ff", fontWeight: "600" }} onClick={()=>dispatch(emptyTheCart())}>Empty Cart</Button>
        </Box>
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
                    <Button  sx={{p:0, mr:2, color:"#000000",backgroundColor: "#f6e7e7ff", fontWeight: "600" }} onClick={()=>{dispatch(decreaseQuantity(elem.id))}}>
                        -
                    </Button>
                    {elem.quantity}
                    <Button  sx={{p:0, ml:2, color:"#000000",backgroundColor: "#f6e7e7ff", fontWeight: "600" }} onClick={()=>{dispatch(increaseQuantity(elem.id))}}>
                        +
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Typography sx={{fontWeight:700 , mb:3}}>Total Cart Value: {cartTotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
           <Button component={Link} to="/checkout" sx={{ mb: 3, color:"#000000",backgroundColor: "#f6e7e7ff", fontWeight: "600" }}>Checkout</Button>
          </Box>
      </Paper>
    </Container>
  );
};

export default Cart;
