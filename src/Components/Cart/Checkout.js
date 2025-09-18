import React from 'react'
import { useSelector } from 'react-redux'
import  {selectCartTotal} from "../../features/cart/cartSlice"
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

const Checkout = () => {
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
   <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
        <Typography sx={{display:"flex", alignItems:"center", justifyContent:"center"}} variant="h5" fontWeight={700} gutterBottom>
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
          <Typography component="div" sx={{fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center"}}>Total Value : {total}</Typography>
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
  )
}

export default Checkout