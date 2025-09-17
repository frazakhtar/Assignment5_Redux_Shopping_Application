import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const HomePage = () => {
  const [product, setProduct] = React.useState([])
  useEffect(()=>{
      getProducts();
  },[])

  const getProducts= async()=>{
      const res = await fetch("./Products.json");
      const result = await res.json();
      setProduct(result)
  }

  const handleAddToCart=()=>{

  }

  return (
    <Container maxWidth="lg" sx={{my:2}}>
      <Paper elevation={3}>
        <Grid container spacing={3} sx={{p:3, display:"flex", alignItems:"center", justifyContent:'center'}}>
        {product.map((elem,index)=>{
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={elem.id}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, height: "25rem", width:"15rem" }}>
                   <CardMedia
                       component="img"
                       height="180"
                       image={elem.image_url}
                       alt={elem.name}
                    />
                    <CardContent>
              <Typography variant="h6" fontWeight={600}>
                {elem.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {elem.brand}
              </Typography>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1 }}>
                ${elem.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </CardActions>
                </Card>
              </Grid>
            )
        })}
      </Grid>
      </Paper>
    </Container>
  )
}

export default HomePage