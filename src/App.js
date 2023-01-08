import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/accounts/login/Login";
import SignUp from "./components/accounts/signUp/SignUp";
import Home from "./components/Home/Home";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { NavLink } from "react-router-dom";
export default function App() {
  return (
    <>
      <AppBar component="nav" sx={{ background: "#cdd0d1", color: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: "flex", alignItems: "center" } }}
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
            <NavLink to="/">
              <Button sx={{ color: "black" }}>Home</Button>
            </NavLink>
            <NavLink to="login">
              <Button
                sx={{ color: "black" }}
                style={{ textDecoration: "none" }}
              >
                Login
              </Button>
            </NavLink>
            <NavLink to="sign-up">
              <Button sx={{ color: "black" }}>SignUp</Button>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
