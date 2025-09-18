import React from 'react'
import Cart from "./Cart"
import { useSelector } from 'react-redux'
import {selectCartTotal} from "../../features/cart/cartSlice"
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';


export default function CheckoutLayout() {
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = React.useState("cod");
    const total= useSelector(selectCartTotal)
    const [formData, setFormData] = React.useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    remarks: "",
  })

     const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Container maxWidth="lg">
    <Grid container padding={2}>
      <Grid item xs={12} md={6}sx={{maxWidth:"620px"}}>
          <Cart button={<Button onClick={()=>navigate("/")} sx={{mb:3, color:"#000000",backgroundColor: "#f6e7e7ff", fontWeight: "600" }}>Go Back To Shopping</Button>} />
      </Grid>

      <Grid item xs={12} md={6} sx={{maxWidth:"500px"}}>
         <Container maxWidth="lg" sx={{display:"flex"}}>
      <Paper elevation={3} sx={{ p: 4, mt: 2, borderRadius: 3 }}>
        <Typography sx={{display:"flex", alignItems:"center", justifyContent:"center"}} variant="h5" gutterBottom>
          Checkout
        </Typography>
          <RadioGroup
          row
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          sx={{ mb: 3, display:"flex", alignItems:"center", justifyContent:"center" }}
        >
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Cash On Delivery"
          />
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="Credit Card"
          />
        </RadioGroup>
        {paymentMethod === "card" && (
        <Box component="form" onSubmit={handleSubmit} noValidate>
        
          <Grid container sx={{display:"flex", alignItems:"center", justifyContent:"center"}} spacing={2}>
         
            <Grid item xs={12}>
              <TextField
                label="Cardholder Name"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ maxLength: 16 }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Expiry Date (MM/YY)"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                fullWidth
                required
                placeholder="MM/YY"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ maxLength: 3 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
          </Grid>

          <Divider sx={{mt:2}}/>
          <Typography component="div" sx={{fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center"}}>Total Shopping Value : {total.toFixed(2)}</Typography>
             <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{my:1.5,py: 1.5, fontWeight: 600, color:"#000000",backgroundColor: "#f6e7e7ff" }}
              >
                Pay Now
              </Button>
        </Box>
        )}
      </Paper>
    </Container>
      </Grid>
    </Grid>
</Container>
  );
}
