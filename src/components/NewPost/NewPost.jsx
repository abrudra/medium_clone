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

export default class NewPost extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      article: {
        title: data.get("articleTitle"),
        description: data.get("about"),
        body: data.get("description"),
        tagList: [data.get("tag")],
      },
    };
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const headers = {
      authorization: `Token ${userDetails.token}`,
      "Content-Type": "application/json",
    };
    await fetch("https://api.realworld.io/api/articles", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          console.log("success", result);
        } else {
          console.log("else", result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      window.location.href = "/dashboard";
  };
  render() {
    const theme = createTheme();
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
            <Typography component="h1" variant="h5">
              New Post
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
                    name="articleTitle"
                    required
                    fullWidth
                    id="articleTitle"
                    placeholder="Article Title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="about"
                    placeholder="What's this article about?"
                    name="about"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextareaAutosize
                    maxRows="50"
                    required
                    fullWidth
                    id="description"
                    placeholder="Write your article (in markdown)"
                    name="description"
                    style={{ width: "100%", height: "100px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="tag"
                    placeholder="Tags"
                    id="tag"
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
      </ThemeProvider>
    );
  }
}
