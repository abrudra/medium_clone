import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      formError: {
        success: { show: false, value: "" },
        error: { show: false, value: "" },
      },
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    let formData = {
      user: {
        email: data.get("email"),
        password: data.get("password"),
      },
    };
    const { email, password } = formData.user;
    if (email && password) {
      await fetch("https://api.realworld.io/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.user) {
            this.setState({
              formError: {
                error: { show: false, value: "" },
                success: { show: true, value: "user register successfully" },
              },
            });
            console.log(result.user)
           
          } else {
            this.setState({
              formError: {
                success: { show: false, value: "" },
                error: { show: true, value: "is invalid" },
              },
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    console.log(formData);
  };
 
  handleSubmitValidation = () => {
    if (this.state.email === "") {
      this.setState({
        email: "email is empty",
      });
    } else {
      this.setState({
        email: "",
      });
    }
    if (this.state.password === "") {
      this.setState({
        password: "password is empty",
      });
    } else {
      this.setState({
        password: "",
      });
    }
  };
  render() {
    let theme = createTheme();
    //  console.log(this.props);
    return (
      <>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {this.state.formError.error.show ? (
                <p style={{color:"red"}}>Username or Password is wrong..!</p>
              ) : null}
              <Box
                component="form"
                onSubmit={this.handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={
                    this.state.email !== "NoEmpty" ? this.state.email : null
                  }
                  onChange={(event) => {
                    if (
                      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
                        event.target.value
                      )
                    ) {
                      this.setState({ email: "NoEmpty" });
                    } else {
                      this.setState({ email: "invalid email" });
                    }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={
                    this.state.password !== "NoEmpty"
                      ? this.state.password
                      : null
                  }
                  onChange={(event) => {
                    if (event.target.value.length < 6) {
                      this.setState({
                        password: "password at least six charactor",
                      });
                    } else {
                      this.setState({ password: "NoEmpty" });
                    }
                  }}
                />
                {this.state.password !== "NoEmpty" ? (
                  <span style={{ color: "red" }}>{this.state.password}</span>
                ) : null}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <NavLink to="/sign-up" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </>
    );
  }
}

export default Login;
