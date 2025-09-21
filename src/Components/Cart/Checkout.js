import React from "react";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../features/cart/cartSlice";
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
import { useNavigate } from "react-router-dom";

export default function CheckoutLayout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = React.useState("cod");
  const total = useSelector(selectCartTotal);
  const [formData, setFormData] = React.useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    remarks: "",
  });

  const [captchaInput, setCaptchaInput] = React.useState("");
  const [captchaValid, setCaptchaValid] = React.useState(false);
  const captchaCode = "1234";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (e) => {
    const value = e.target.value;
    setCaptchaInput(value);
    setCaptchaValid(value === captchaCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === "cod" && !captchaValid) {
      alert("Please enter the correct captcha!");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Order placed successfully!");
  };

  const formWidth = 400;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="center">
        <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: "1200px" }}>
          <Grid item xs={12} md={6}>
            <Cart
              button={
                <Box display="flex" justifyContent="center">
                  <Button
                    onClick={() => navigate("/")}
                    sx={{
                      mb: 2,
                      px: 3,
                      py: 1,
                      color: "#000000",
                      backgroundColor: "#f6e7e7ff",
                      fontWeight: "600",
                      borderRadius: 2,
                    }}
                  >
                    Go Back To Shopping
                  </Button>
                </Box>
              }
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 3,
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: formWidth,
              }}
            >
              <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
                Checkout
              </Typography>

              <RadioGroup
                row
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ mb: 3, justifyContent: "center" }}
              >
                <FormControlLabel value="cod" control={<Radio />} label="Cash On Delivery" />
                <FormControlLabel value="card" control={<Radio />} label="Credit Card" />
              </RadioGroup>

              <Box sx={{ width: "100%", maxWidth: formWidth, display: "flex", flexDirection: "column", gap: 2 }}>
                {paymentMethod === "card" ? (
                  <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField label="Cardholder Name" name="cardName" value={formData.cardName} onChange={handleChange} fullWidth required />
                    <TextField label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleChange} fullWidth required inputProps={{ maxLength: 16 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField label="Expiry Date (MM/YY)" name="expiry" value={formData.expiry} onChange={handleChange} fullWidth required />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="CVV" name="cvv" value={formData.cvv} onChange={handleChange} fullWidth required inputProps={{ maxLength: 3 }} />
                      </Grid>
                    </Grid>
                    <TextField label="Remarks" name="remarks" value={formData.remarks} onChange={handleChange} fullWidth multiline rows={3} />

                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography align="center" fontWeight={700} sx={{ mb: 2 }}>
                      Total Shopping Value: {total.toFixed(2)}
                    </Typography>
                    <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, fontWeight: 600, color: "#000000", backgroundColor: "#f6e7e7ff" }}>
                      Pay Now
                    </Button>
                  </Box>
                ) : (
                  <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField label={`Enter Captcha (${captchaCode})`} value={captchaInput} onChange={handleCaptchaChange} fullWidth required />
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography align="center" fontWeight={700} sx={{ mb: 2 }}>
                      Total Shopping Value: {total.toFixed(2)}
                    </Typography>
                    <Button type="submit" variant="contained" fullWidth disabled={!captchaValid} sx={{ py: 1.5, fontWeight: 600, color: "#000000", backgroundColor: "#f6e7e7ff" }}>
                      Order Now
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
