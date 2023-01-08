import { Component } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";  
import { NavLink } from "react-router-dom";

class Article extends Component{
    render(){
        return (
          <AppBar
            component="nav"
            sx={{ background: "#cdd0d1", color: "black" }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { sm: "flex", alignItems: "center" },
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5968/5968885.png"
                  width="40px"
                  alt="image1"
                  style={{ marginRight: "10px" }}
                />
                Medium
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: "black" }}>Home</Button>
                </NavLink>
                <NavLink to="login" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: "black" }}>Login</Button>
                </NavLink>
                <NavLink to="sign-up" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: "black" }}>SignUp</Button>
                </NavLink>
              </Box>
            </Toolbar>
          </AppBar>
        );
    }
}

export default Article;