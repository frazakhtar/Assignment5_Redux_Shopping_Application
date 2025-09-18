import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

const HomePage = () => {
  const [product, setProduct] = React.useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await fetch("Products.json");
    const result = await res.json();
    setProduct(result);
  };
  const dispatch=useDispatch()
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Paper elevation={3}>
          <Typography variant="h3" component="h3" sx={{p:3, display:"flex", alignItems:"center", justifyContent:"center"}}>Available Products</Typography>
        <Grid
          container
          spacing={3}
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {product.map((elem) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={elem.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: 3,
                    height: "25rem",
                    width: "15rem",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={elem.image_url}
                    alt={elem.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {elem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {elem.brand}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mt: 2 }}
                    >
                      ${elem.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: "auto", mb: 1 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="#000000"
                      sx={{ backgroundColor: "#f6e7e7ff", fontWeight: "600" }}
                      onClick={() => handleAddToCart(elem)}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
