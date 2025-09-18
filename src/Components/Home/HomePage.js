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
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import SearchIcon from '@mui/icons-material/Search';

const HomePage = () => {
  const [product, setProduct] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [query, setQuery] = React.useState("");
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await fetch("Products.json");
    const result = await res.json();
    setProduct(result);
    setFiltered(result);
  };
  const dispatch = useDispatch();
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
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Paper elevation={3}>
        <Typography
          variant="h3"
          component="h3"
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
          {filtered.map((elem) => {
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
