import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { selectCartTotal, increaseQuantity, decreaseQuantity, emptyTheCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Cart = ({ button }) => {
  const cartData = useSelector((state) => state.cart.items);
  const cartTotal= useSelector(selectCartTotal)
  const dispatch = useDispatch();
  return (
    <Container maxWidth="md" sx={{my:2}}>
      <Paper elevation={3} sx={{ borderRadius: 3}}>
        <Typography variant="h5"component="h5" sx={{p:3,display:"flex",alignItems:"center",justifyContent:"center"}}>My Cart</Typography>
        <Box sx={{pr:4,display:"flex", alignItems:"right", justifyContent:"right"}}>
          <Button disabled={cartData.length===0}  sx={{ color:"#000000",backgroundColor: "#f6e7e7ff", fontWeight: "600" }} onClick={()=>dispatch(emptyTheCart())}>Empty Cart</Button>
        </Box>
        <Grid
          container
          sx={{
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
                  <Box sx={{m:1,p:1, width:"80px"}}>{elem.name}</Box>
                  <Box sx={{m:1,p:1, width:"80px"}}>{elem.price}</Box>
                  <Box sx={{m:1,p:1, width: "100px"}}>
                    <Button  sx={{minWidth:"20px", p:"2px 2px",mr:2, fontSize:"0.8rem",color:"#000000",backgroundColor: "#f6e7e7ff", fontWeight: "600" }} onClick={()=>{dispatch(decreaseQuantity(elem.id))}}>
                        -
                    </Button>
                    {elem.quantity}
                    <Button  sx={{minWidth:"20px", p:"2px 2px",ml:2, fontSize:"0.8rem",color:"#000000",backgroundColor: "#f6e7e7ff", fontWeight: "600" }}  onClick={()=>{dispatch(increaseQuantity(elem.id))}}>
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
           {button? button:<Button disabled={cartData.length===0} component={Link} to="/checkout" sx={{ mb: 3, color:"#000000",backgroundColor: "#f6e7e7ff", fontWeight: "600" }}>Checkout</Button>}
          </Box>
      </Paper>
    </Container>
  );
};

export default Cart;
