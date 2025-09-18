import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const About = () => {
  let navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          backgroundColor: "#fafafa",
        }}
      >
        <Grid container spacing={4} sx ={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Grid sx ={{display:"flex",alignItems:"center",justifyContent:"center"}} item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.pexels.com/photos/2529151/pexels-photo-2529151.jpeg"
              alt="About Our Store"
              sx={{
                width: "75%",
                borderRadius: 3,
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid sx={{width:"75%"}} item xs={12} md={6}>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Welcome to <strong>StepUp Shopping</strong>, your trusted destination
              for high-quality footwear. Our mission is to make style and
              comfort accessible to everyone. Whether you're an athlete, an
              adventurer, or a casual walker, we have the perfect pair for you.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We collaborate with top brands and emerging designers to bring you
              a wide collection of sneakers, boots, trainers, and casual wear.
              Every shoe is carefully selected for its craftsmanship, comfort,
              and style.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Thank you for choosing us. Lace up, step forward, and walk your
              journey with confidence.
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Button onClick={()=>navigate("/")} variant="contained" size="large" sx={{ color:"#000000",backgroundColor: "#f6e7e7ff", fontWeight: "600" }}>
                Shop Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;
