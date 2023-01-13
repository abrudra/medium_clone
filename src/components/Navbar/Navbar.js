import React from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
function Navbar({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <>
      <AppBar component="nav" sx={{ background: "#ffbc00", color: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { sm: "flex", alignItems: "center" },
            }}
          >
            <NavLink to="/" style={{ textDecoration: "none", color: "Black" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/5968/5968885.png"
                width="40px"
                alt="image1"
                style={{ marginRight: "10px" }}
              />
            </NavLink>
            <NavLink to="/" style={{ textDecoration: "none", color: "Black" }}>
              Medium
            </NavLink>
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isLoggedIn ? (
              <>
                <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: "black" }}>Home</Button>
                </NavLink>
                <NavLink to="/new-post" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: "black" }}>New Post</Button>
                </NavLink>
                <NavLink to="/setting" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: "black" }}>setting</Button>
                </NavLink>
                <NavLink to="" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{ color: "black" }}
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    {userDetails.username}
                  </Button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: "black" }}>Home</Button>
                </NavLink>
                <NavLink to="login" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: "black" }}>Login</Button>
                </NavLink>
                <NavLink to="sign-up" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: "black" }}>SignUp</Button>
                </NavLink>
                <NavLink
                  to="article/"
                  style={{ textDecoration: "none" }}
                ></NavLink>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "80px" }}>{children}</div>
    </>
  );
}

export default Navbar;
