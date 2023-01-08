import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import moment from "moment";
import Chip from "@mui/material/Chip";

function Article() {
  const { slug } = useParams();
  const [response, setResponse] = useState(null);
  useEffect(() => {
    const apiCall = (data) => {
      return axios
        .get(`https://api.realworld.io/api/articles/${data}`)
        .then((response) => {
          setResponse(response.data.article);
        })
        .catch((error) => {
          console.log("error");
        });
    };
    apiCall(slug);
  }, [slug]);
  // let { username, image } = response.article.author;
  // let { title, description, tagList, favoritesCount } = response.article;
  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {response ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" component="div">
                    {response.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <img
                        src={response.author.image}
                        alt="auth"
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {response.author.username}
                      <br />
                      {moment(response.updatedAt).format("llll")}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {response.body}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {response.tagList.map((items) => {
                return (
                  <Chip
                    label={items}
                    variant="outlined"
                    style={{ margin: "5px" }}
                  />
                );
              })}
            </Grid>
          </Grid>
        ) : null}
      </Box>
    </Container>
  );
}
export default Article;
