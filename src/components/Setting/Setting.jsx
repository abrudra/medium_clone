import React, { Component } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      bio: "",
      password: "",
      image: "",
    };
  }
  handleInput = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "username":
        this.setState({ username: value });
        break;
      case "email":
        this.setState({ email: value });
        break;
      case "password":
        this.setState({ password: value });
        break;
      case "image":
        this.setState({ image: value });
        break;
      case "bio":
        this.setState({ bio: value });
        break;
      default:
        break;
    }
  };
  componentDidMount() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const headers = {
      authorization: `Token ${userDetails.token}`,
      "Content-Type": "application/json",
    };
    fetch(`https://api.realworld.io/api/user`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((user) =>
        this.setState({
          email: user.user.email,
          bio: user.user.bio,
          image: user.user.image,
          username: user.user.username,
        })
      );
  }
  handleUpdateProfile = (event) => {
    event.preventDefault();
    const user = {
      user: {
        image: this.state.image,
        bio: this.state.bio,
        email: this.state.email,
        username: this.state.username,
      },
    };
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const headers = {
      authorization: `Token ${userDetails.token}`,
      "Content-Type": "application/json",
    };
    fetch(`https://api.realworld.io/api/user`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((user) => {
        this.setState({
          bio: user.user.bio,
          image: user.user.image,
          email: this.state.email,
        });
        localStorage.setItem("userDetails", JSON.stringify(user.user));

        window.location.href = "/dashboard";
      });
  };
  onlogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  render() {
    const theme = createTheme();
    const { username, bio, image, email } = this.state;
    return (
      <ThemeProvider theme={theme}>
        {username && bio && image && email ? (
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
              <Typography component="h1" variant="h5">
                Setting
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={this.handleUpdateProfile}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="image"
                      required
                      fullWidth
                      id="image"
                      autoFocus
                      defaultValue={image}
                      onChange={this.handleInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      name="username"
                      defaultValue={username}
                      onChange={this.handleInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextareaAutosize
                      maxRows="50"
                      required
                      fullWidth
                      id="bio"
                      name="bio"
                      style={{ width: "100%", height: "100px" }}
                      defaultValue={bio}
                      onChange={this.handleInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="email"
                      id="email"
                      defaultValue={email}
                      onChange={this.handleInput}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Container>
        ) : null}
      </ThemeProvider>
    );
  }
}
