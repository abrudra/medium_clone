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
    const apiCall = async (data) => {
      try {
        const response = await axios
          .get(`https://api.realworld.io/api/articles/${data}`);
        setResponse(response.data.article);
      } catch (error) {
        console.log("error");
      }
    };
    apiCall(slug);
  }, [slug]);

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
            <Grid item xs={12} container>
              <Grid container spacing={5}>
                <Grid
                  item
                 
                  xs={12}
                  style={{ background: "black", color: "white" }}
                >
                  <Typography variant="h3" component="div">
                    {response.title}
                  </Typography>
                  <Grid container spacing={2} rowGap={12}>
                    <Grid item xs={0.5} >
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
                <Grid item xs={12}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ fontSize: 20 }}
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
