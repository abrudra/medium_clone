import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import moment from "moment";
import Chip from "@mui/material/Chip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import Progress from "../progress/Progress";

function TabPanel(props) {
  let { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      articleData: [],
      tagList: {},
      filteredTagData: {},
      error: "",
      visiblefilteredTab: false,
      tagToFilter: "",
      loading: false,
    };
  }
  handleChange = () => {
    this.setState({ value: this.state.value === 0 ? 1 : 0 });
    if (this.state.value === 1) {
      this.setState({ visiblefilteredTab: false });
    }
  };
  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  handleClick = (tag) => {
    this.setState({ visiblefilteredTab: true, value: 1 });
    this.setState({
      loading: true,
    });
    axios
      .get(`https://api.realworld.io/api/articles?tag=${tag}&limit=10&offset=0`)
      .then((response) => {
        this.setState({
          filteredTagData: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: "Data fetching error",
        });
      });
  };
  componentDidMount() {
    this.setState({
      loading: true,
    });
    axios
      .get(`https://api.realworld.io/api/articles`)
      .then((response) => {
        this.setState({
          articleData: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: "Data fetching error",
        });
      });
    //Tag Call
    this.setState({
      loading: true,
    });
    axios
      .get(`https://api.realworld.io/api/tags`)
      .then((response) => {
        this.setState({
          tagList: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: "Data fetching error",
        });
      });
    // this.setState({ articleData: data });
  }
  render() {
    return (
      <>
        <Box
          sx={{ flexGrow: 1 }}
          style={{
            marginTop: "1px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ flexGrow: 1, background: "#ffbc00" }}>
              <img
                src="https://miro.medium.com/1*5ER2KRyL5S0S_xX8Pf0lgg.png"
                alt="img"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "contain",
                  marginTop: "1px",
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="Global content" />
                        {this.state.visiblefilteredTab ? (
                          <Tab label={`#${this.state.tagToFilter}`} />
                        ) : null}
                      </Tabs>
                    </Box>
                    <TabPanel
                      value={this.state.value === 0 ? this.state.value : null}
                      index={0}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          {this.state.loading ? <Progress /> : null}
                          {this.state.articleData.articles
                            ? this.state.articleData.articles.map((item) => {
                                let { username, image } = item.author;
                                let {
                                  title,
                                  description,
                                  tagList,
                                  favoritesCount,
                                  slug,
                                } = item;
                                return (
                                  <Card sx={{ width: "100%", margin: "10px" }}>
                                    <CardContent>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                          <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                              <Grid container spacing={2}>
                                                <Grid item xs={2}>
                                                  <img
                                                    src={image}
                                                    alt="auth"
                                                    style={{
                                                      borderRadius: "50%",
                                                    }}
                                                  />
                                                </Grid>
                                                <Grid item xs={6}>
                                                  {username}
                                                  <br />
                                                  {moment(
                                                    item.updatedAt
                                                  ).format("llll")}
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={6}
                                              style={{
                                                display: "flex",
                                                flexDirection: "row-reverse",
                                              }}
                                            >
                                              <Button
                                                variant="outlined"
                                                startIcon={
                                                  <FavoriteBorderIcon />
                                                }
                                              >
                                                {favoritesCount}
                                              </Button>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Link
                                        to={`/article/global/${slug}`}
                                        style={{ textDecoration: "none" }}
                                      >
                                        <Typography
                                          variant="h6"
                                          component="div"
                                        >
                                          {title}
                                        </Typography>
                                      </Link>
                                      <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        gutterBottom
                                      >
                                        {description}
                                      </Typography>
                                    </CardContent>
                                    <CardActions>
                                      <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                          <Link
                                            to={`/article/${slug}`}
                                            style={{ textDecoration: "none" }}
                                          >
                                            <span> Read More..</span>
                                          </Link>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={6}
                                          style={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                          }}
                                        >
                                          {tagList.map((items) => {
                                            return (
                                              <Chip
                                                label={items}
                                                variant="outlined"
                                              />
                                            );
                                          })}
                                        </Grid>
                                      </Grid>
                                    </CardActions>
                                  </Card>
                                );
                              })
                            : null}
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel
                      value={this.state.value === 1 ? this.state.value : null}
                      index={1}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          {this.state.loading ? <Progress /> : null}
                          {this.state.filteredTagData.articles
                            ? this.state.filteredTagData.articles.map(
                                (item) => {
                                  let { username, image } = item.author;
                                  let {
                                    title,
                                    description,
                                    tagList,
                                    favoritesCount,
                                    slug,
                                  } = item;
                                  return (
                                    <Card
                                      sx={{ width: "100%", margin: "10px" }}
                                    >
                                      <CardContent>
                                        <Grid container spacing={2}>
                                          <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                              <Grid item xs={6}>
                                                <Grid container spacing={2}>
                                                  <Grid item xs={2}>
                                                    <img
                                                      src={image}
                                                      alt="auth"
                                                      style={{
                                                        borderRadius: "50%",
                                                      }}
                                                    />
                                                  </Grid>
                                                  <Grid item xs={6}>
                                                    {username}
                                                    <br />
                                                    {moment(
                                                      item.updatedAt
                                                    ).format("llll")}
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                              <Grid
                                                item
                                                xs={6}
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row-reverse",
                                                }}
                                              >
                                                <Button
                                                  variant="outlined"
                                                  startIcon={
                                                    <FavoriteBorderIcon />
                                                  }
                                                >
                                                  {favoritesCount}
                                                </Button>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Link to={`/article/global/${slug}`}>
                                          <Typography
                                            variant="h6"
                                            component="div"
                                          >
                                            {title}
                                          </Typography>
                                        </Link>
                                        <Typography
                                          sx={{ fontSize: 14 }}
                                          color="text.secondary"
                                          gutterBottom
                                        >
                                          {description}
                                        </Typography>
                                      </CardContent>
                                      <CardActions>
                                        <Grid container spacing={2}>
                                          <Grid item xs={6}>
                                            <span> Read More..</span>
                                          </Grid>
                                          <Grid
                                            item
                                            xs={6}
                                            style={{
                                              display: "flex",
                                              flexDirection: "row-reverse",
                                            }}
                                          >
                                            {tagList.map((items) => {
                                              return (
                                                <Chip
                                                  label={items}
                                                  variant="outlined"
                                                />
                                              );
                                            })}
                                          </Grid>
                                        </Grid>
                                      </CardActions>
                                    </Card>
                                  );
                                }
                              )
                            : null}
                        </Grid>
                      </Grid>
                    </TabPanel>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ p: 3, backgroundColor: "#f3f3f3", width: 400 }}>
                <Typography>Popular Tags</Typography>
                {this.state.loading ?? <Progress />}
                {this.state.tagList.tags
                  ? this.state.tagList.tags.map((items) => {
                      return (
                        <Chip
                          label={items}
                          onClick={() => {
                            this.setState({ tagToFilter: items });
                            this.handleClick(items);
                          }}
                          style={{ margin: "5px" }}
                        />
                      );
                    })
                  : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default Home;
