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

class SignUp extends React.Component {
    constructor() {
      super();
      this.state = {
        username: "",
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
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
      },
    };
    const { username, email, password } = formData.user;
    if (username && email && password) {
      await fetch("https://api.realworld.io/api/users", {
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
             this.props.updateUser(result);
          } else {
            this.setState({
              formError: {
                success: { show: false, value: "" } ,
                error: { show: true, value: result.errors.email[0] },

              },
            });
          }
          
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  handleSubmitValidation = () => {
    if (this.state.username === "") {
      this.setState({
        username: "username is empty",
      });
    } else {
      this.setState({
        username: "",
      });
    }
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

    return (
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
              Sign up
            </Typography>
            {this.state.formError.success.show ? <p style={{color:"green"}}>User registered successfully.!</p> : null}
            {this.state.formError.error.show ? (
              <p style={{color:"red"}}>Already user registered With this email id.</p>
            ) : null}
            <Box
              component="form"
              noValidate
              onSubmit={this.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    error={
                      this.state.username !== "NoEmpty"
                        ? this.state.username
                        : null
                    }
                    onChange={(event) => {
                      if (event.target.value.length < 6) {
                        this.setState({
                          username: "username at least six charactor",
                        });
                      } else {
                        this.setState({ username: "NoEmpty" });
                      }
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address" 
                    name="email"
                    autoComplete="email"
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
                  {this.state.email !== "NoEmpty" ? (
                    <span style={{ color: "red" }}>{this.state.email}</span>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={this.handleSubmitValidation}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/login" variant="body2">
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default SignUp;
