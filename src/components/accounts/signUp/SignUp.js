import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
      username: false,
      email: false,
      password: false,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    let formData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };
    // if (formData.username && formData.email && formData.password){
    //   console.log("data present")
    //   console.log(formData)
    // }else{
    //   console.log("data empty")
    //   console.log(formData)
    // }
     console.log(formData);
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
                    error={this.state.username}
                    onChange={(event) => {
                      if (event.target.value.length < 6) {
                        this.setState({ username: true });
                      } else {
                        this.setState({ username: false });
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
                    error={this.state.email}
                    onChange={(event) => {
                      if (
                        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
                          event.target.value
                        )
                      ) {
                        this.setState({ email: false });
                      } else {
                        this.setState({ email: true });
                      }
                    }}
                  />
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
                    error={this.state.password}
                    onChange={(event) => {
                      if (event.target.value.length < 6) {
                        this.setState({ password: true });
                      } else {
                        this.setState({ password: false });
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="to agree to Medium’s Terms of Service and acknowledge."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={()=>{
                  // if(this.state.username && this.state.email && this.state.password){
                  //   this.setState({
                  //     username: false,
                  //     email: false,
                  //     password: false,
                  //   });
                  // }else{
                  //   this.setState({
                  //     username: true,
                  //     email: true,
                  //     password: true,
                  //   });
                  // }
                  // console.log(this.state.username)
                  // if(this.state.username){
                  //   this.setState({
                  //     username: false
                  //   })
                  // }else{
                  //   this.setState({
                  //     username: true,
                  //   });
                  // }
                  // console.log(this.state)
                  // switch (this.state) {
                  //   case this.state.username === false:
                  //     return this.setState({
                  //       username: true,
                  //     });
                  //   case this.state.email:
                  //     return this.setState({
                  //       email: true,
                  //     });
                  //   case this.state.password:
                  //     return this.setState({
                  //       password: true,
                  //     });
                  //     default : 
                  //     return null
                  // }
                // }}
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
