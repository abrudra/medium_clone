import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import moment from "moment";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";

function Article() {
  const { slug } = useParams();
  const [response, setResponse] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const apiCall = async (data) => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/articles/${data}`
        );
        setResponse(response.data.article);
      } catch (error) {
        console.log("error");
      }
    };
    apiCall(slug);
  }, [slug]);
  const handleEdit = (data) => {
    history.push(`/edit-article/${data}`);
  };

  const handleDelete = async (data) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const headers = {
      authorization: `Token ${userDetails.token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.delete(
      `https://api.realworld.io/api/articles/${data}`,
      {
        headers: headers,
      }
    );
    if (response.status === 204) {
      history.push(`/dashboard`);
    }
    console.log(response);
  };
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
                    <Grid item xs={0.5}>
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
                      <Button
                        variant="outlined"
                        onClick={() => handleEdit(response.slug)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(response.slug)}
                      >
                        Delete
                      </Button>
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
