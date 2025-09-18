import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { Link } from "react-router-dom";
import { Close } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorNav, setAnchorNav] = useState(null);
  const openMenu = (e) => {
    setAnchorNav(e.currentTarget);
  };
  const closeMenu = () => {
    setAnchorNav(null);
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={() => navigate("/")} 
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Box
            component="img"
            src="./ShoesLogo.png"
            alt="Step-Up Shopping Logo"
            sx={{ height: 40 }}
          />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "black",
            fontWeight: "700",
            fontFamily: "Poppins, sans-serif",
            flexGrow: 1,
            ml: 1,
            textAlign: "center",
            display: { xs: "none", md: "flex" },
          }}
        >
          StepUp Shopping
        </Typography>
        <Box sx={{display: { xs: "none", md: "flex", gap: 10} }}>
          <Button sx={{color:"#000000", border: "1px solid black", borderRadius:"2rem"}} component={Link} to="/">
            Home
          </Button>
          <Button sx={{color:"#000000", border: "1px solid black", borderRadius:"2rem"}} component={Link} to="/about">
            About
          </Button>
          <Button startIcon={<ShoppingCartTwoToneIcon />} sx={{color:"#000000", border: "1px solid black", borderRadius:"2rem"}} component={Link} to="/cart">
            Cart
          </Button>
        </Box>

        {/* This is for responsive screens */}

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            width: "100%",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => navigate("/")} 
            size="large"
            edge="start"
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Box
              component="img"
              src="./ShoesLogo.png"
              alt="Step-Up Shopping Logo"
              sx={{ height: 40 }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "black",
              fontWeight: "700",
              fontFamily: "Poppins, sans-serif",
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems:"center",
              justifyContent:"center"
            }}
          >
            StepUp Shopping
          </Typography>
          <IconButton
            onClick={(e) => openMenu(e)}
            size="large"
            edge="end"
            color="black"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            {Boolean(anchorNav) ? <Close /> : <MenuIcon />}
          </IconButton>
          <Menu
            anchorEl={anchorNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorNav)}
            onClose={closeMenu}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuList sx={{ m: 0.5, p: 0.5 }} onClick={() => closeMenu()}>
              <MenuItem sx={{fontFamily: "Poppins, sans-serif"}} component={Link} to={"/"}>
                Home
              </MenuItem>
              <MenuItem sx={{fontFamily: "Poppins, sans-serif"}} component={Link} to={"/about"}>
                About
              </MenuItem>
              <MenuItem component={Link} to={"/cart"}>
                Cart
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
