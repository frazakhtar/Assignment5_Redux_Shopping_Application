import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import SearchIcon from "@mui/icons-material/Search";
import Cart from "../Cart/Cart.js";

const HomePage = () => {
  const [product, setProduct] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await fetch("Products.json");
    const result = await res.json();
    setProduct(result);
    setFiltered(result);
    setIsLoading(false);
  };

  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) {
      setFiltered(product);
    } else {
      setFiltered(
        product.filter(
          (p) =>
            p.name.toLowerCase().includes(value.toLowerCase()) ||
            p.brand.toLowerCase().includes(value.toLowerCase()) ||
            p.description.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      <Cart />
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <Paper elevation={3}>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Available Products
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              value={query}
              variant="standard"
              onChange={handleSearch}
              placeholder="Search Products"
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                pl: 1,
                pt: 1,
                width: "20rem",
                height: "2.5rem",
                border: "1px solid black",
                borderRadius: "10rem",
              }}
            />
          </Box>

          {isLoading ? (
            <Paper
              sx={{
                fontSize: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 3,
                p: 4,
              }}
            >
              Loading...
            </Paper>
          ) : (
            <Grid
              container
              spacing={3}
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {filtered.map((elem) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={elem.id}
                  sx={{ display: "flex" }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      boxShadow: 3,
                      width: "18rem",
                      height: "24rem",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={elem.image_url}
                      alt={elem.name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                        p: 2,
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        {elem.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {elem.brand}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ mt: 1, mb: 1 }}
                      >
                        ${elem.price}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        disabled={cartItem?.some((item) => item.id === elem.id)}
                        sx={{
                          backgroundColor: "#f6e7e7ff",
                          fontWeight: "600",
                          color: "#000",
                        }}
                        onClick={() => handleAddToCart(elem)}
                      >
                        {cartItem?.some((item) => item.id === elem.id)
                          ? "Product Added"
                          : "Add to Cart"}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default HomePage;
