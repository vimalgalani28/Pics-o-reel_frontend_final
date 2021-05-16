import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { red } from "@material-ui/core/colors";
import EntryCard from "../components/Card/Card";
import { Button, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import IconButton from "@material-ui/core/IconButton";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import { connect } from "react-redux";
import { setAllEntries } from "../actions/allEntry";
import { addInWishlist, removeExpense } from "../actions/wishlist";
import { ContactsOutlined } from "@material-ui/icons";
import CheckBoxTwoToneIcon from "@material-ui/icons/CheckBoxTwoTone";
import CheckBoxOutlineBlankTwoToneIcon from "@material-ui/icons/CheckBoxOutlineBlankTwoTone";
import { addInVote, deleteInVote, setInVote } from "../actions/voteList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: "0 auto",
    width: "300px",
    [theme.breakpoints.up("sm")]: {
      width: "570px",
    },
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    overflowX: "hidden",
    overflowY: "hidden",
  },
  colorText: {
    fontSize: "70%",
    color: "hsl(43, 89%, 70%)",
  },
  containerText: {
    textAlign: "center",
    width: "80%",
    margin: "0 auto",
  },
  title: {
    color: "#fff",
    fontSize: "4.5rem",
    marginBottom: "30px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "3.0rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.0rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3.8rem",
    },
  },
}));

const useStylesCard = makeStyles((theme) => ({
  root: {
    minWidth: 180,
    [theme.breakpoints.up("md")]: {
      minWidth: 450,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    backgroundSize: "contain",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const AllEntries = (props) => {
  const history = useHistory();
  // const handleWish = (entry) => {
  //   console.log(entry);
  //   entry.wish = !entry.wish;
  // };

  //   useEffect(() => {
  //     const fetchAllEntries = async () => {
  //       const token = JSON.parse(localStorage.getItem("picsjwt"));
  //       const allEntriesAPI = {
  //         method: "GET",
  //         url: "http://localhost:5000oreal.in/entries/allentries",
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };
  //       try {
  //         const res = await axios(allEntriesAPI);
  //         // console.log(res.data);
  //         // setAllSubEntries(res.data);
  //         props.dispatch(setAllEntries(res.data));
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //     fetchAllEntries();
  //   }, []);

  const giveVote = async (section) => {
    if (props.voteEntries) {
      const vote = props.voteEntries.map((entry) => {
        // if (entry.section !== section) {
        //   return null;
        // }
        return entry._id;
      });
      console.log(vote);
      //   const options = {
      //   method: "POST",
      //   url: "http://localhost:5000oreal.in/user/login",
      //   data: {
      //     idToken: data.idToken.rawIdToken,
      //   },
      const token = JSON.parse(localStorage.getItem("picsjwt"));
      const options = {
        method: "POST",
        url: "http://localhost:5000/vote",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          votedEntries: vote,
          section: section,
        },
      };

      try {
        const res = await axios(options);
        console.log(res.data);
        vote.map((id) => {
          props.dispatch(deleteInVote(id));
        });
        console.log("Deleted All");
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  const handleAddVoteList = (entry) => {
    console.log(entry.vote);

    if (entry.vote) {
      props.dispatch(addInVote(entry));
    } else {
      props.dispatch(deleteInVote(entry._id));
      console.log("removed!", entry._id);
    }
    entry.vote = !entry.vote;
    console.log(props.voteEntries);
  };
  console.log(props);

  const paintings = props.myWishEntries.filter(
    (entry) => entry.section === "Painting"
  );
  const photographies = props.myWishEntries.filter(
    (entry) => entry.section === "Photography"
  );
  const calligraphies = props.myWishEntries.filter(
    (entry) => entry.section === "Calligraphy"
  );
  const independenceDayEntries = props.myWishEntries.filter(
    (entry) => entry.section === "Independence"
  );

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const classesCard = useStylesCard();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <div className="entries">
        <AppBar position="static" color="default" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="on"
            textColor="primary"
          >
            <Tab label="Painting/Sketches" {...a11yProps(0)} />
            <Tab label="Photography" {...a11yProps(1)} />
            <Tab label="Others" {...a11yProps(2)} />
            <Tab label="Independence Day Special" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            className={classes.container}
          >
            {paintings.length === 0 && (
              <div className={classes.containerText}>
                <h1 className={classes.title}>
                  <br></br>
                  <span className={classes.colorText}>
                    You haven't submitted any entries in this section
                  </span>
                </h1>
              </div>
            )}
            <Grid container spacing={4}>
              {paintings.map((paint) => {
                const handleEachWish = () => {
                  paint.wish = !paint.wish;
                };
                return (
                  <Grid item xs={12} sm={6} key={paint._id}>
                    <Card className={classesCard.root}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classesCard.avatar}
                          ></Avatar>
                        }
                        action={
                          <Button
                            color="primary"
                            aria-label="add to wishlist"
                            onClick={(e) => handleAddVoteList(paint, e)}
                          >
                            {props.voteEntries ? (
                              props.voteEntries.some(
                                (entry) => entry._id === paint._id
                              ) ? (
                                <CheckBoxTwoToneIcon />
                              ) : (
                                <CheckBoxOutlineBlankTwoToneIcon />
                              )
                            ) : (
                              <></>
                            )}
                          </Button>
                        }
                        title={paint.title}
                        subheader={moment(paint.createdAt).format(
                          "MMMM D, YYYY"
                        )}
                      />
                      <CardMedia
                        className={classesCard.media}
                        image={paint.imageThumbLink}
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {paint.description}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing></CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => giveVote("painting", e)}
            >
              Vote!
            </Button>
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
            className={classes.container}
          >
            {photographies.length === 0 && (
              <div className={classes.containerText}>
                <h1 className={classes.title}>
                  <br></br>
                  <span className={classes.colorText}>
                    You haven't submitted any entries in this section
                  </span>
                </h1>
              </div>
            )}
            <Grid container spacing={4}>
              {photographies.map((photo) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={photo._id}
                    className={classes.grid}
                  >
                    <Card className={classesCard.root}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classesCard.avatar}
                          ></Avatar>
                        }
                        action={
                          <Button
                            color="primary"
                            aria-label="add to wishlist"
                            onClick={(e) => handleAddVoteList(photo, e)}
                          >
                            {props.voteList ? (
                              props.voteList.some(
                                (entry) => entry._id === photo._id
                              ) ? (
                                <BookmarksIcon />
                              ) : (
                                <BookmarkBorderIcon />
                              )
                            ) : (
                              <BookmarksIcon />
                            )}
                          </Button>
                        }
                        title={photo.title}
                        subheader={moment(photo.createdAt).format(
                          "MMMM D, YYYY"
                        )}
                      />
                      <CardMedia
                        className={classesCard.media}
                        image={photo.imageThumbLink}
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {photo.description}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing></CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => giveVote("photography", e)}
            >
              Vote!
            </Button>
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
            dir={theme.direction}
            className={classes.container}
          >
            {calligraphies.length === 0 && (
              <div className={classes.containerText}>
                <h1 className={classes.title}>
                  <br></br>
                  <span className={classes.colorText}>
                    You haven't submitted any entries in this section
                  </span>
                </h1>
              </div>
            )}
            <Grid container spacing={3}>
              {calligraphies.map((calli) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={calli._id}
                    className={classes.grid}
                  >
                    <Card className={classesCard.root}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classesCard.avatar}
                          ></Avatar>
                        }
                        action={
                          <IconButton
                            color="primary"
                            aria-label="add to wishlist"
                            // onClick={(calli) => handleWish}
                          >
                            {calli.wish ? (
                              <BookmarksIcon />
                            ) : (
                              <BookmarkBorderIcon />
                            )}
                          </IconButton>
                        }
                        title={calli.title}
                        subheader={moment(calli.createdAt).format(
                          "MMMM D, YYYY"
                        )}
                      />
                      <CardMedia
                        className={classesCard.media}
                        image={calli.imageThumbLink}
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {calli.description}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing></CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </TabPanel>

          <TabPanel
            value={value}
            index={3}
            dir={theme.direction}
            className={classes.container}
          >
            {independenceDayEntries.length === 0 && (
              <div className={classes.containerText}>
                <h1 className={classes.title}>
                  <br></br>
                  <span className={classes.colorText}>
                    You haven't submitted any entries in this section
                  </span>
                </h1>
              </div>
            )}
            <Grid container spacing={3}>
              {independenceDayEntries.map((calli) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={calli._id}
                    className={classes.grid}
                  >
                    <Card className={classesCard.root}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classesCard.avatar}
                          ></Avatar>
                        }
                        action={
                          <Button
                            color="primary"
                            aria-label="add to wishlist"
                            onClick={(e) => handleAddVoteList(calli, e)}
                          >
                            {props.voteList ? (
                              props.voteList.some(
                                (entry) => entry._id === calli._id
                              ) ? (
                                <BookmarksIcon />
                              ) : (
                                <BookmarkBorderIcon />
                              )
                            ) : (
                              <BookmarksIcon />
                            )}
                          </Button>
                        }
                        title={calli.title}
                        subheader={moment(calli.createdAt).format(
                          "MMMM D, YYYY"
                        )}
                      />
                      <CardMedia
                        className={classesCard.media}
                        image={calli.imageThumbLink}
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {calli.description}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing></CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => giveVote("independence", e)}
            >
              Vote!
            </Button>
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  myWishEntries: state.wishlist,
  allEntries: state.allEntries,
  voteEntries: state.voteList,
});

export default connect(mapStateToProps)(AllEntries);
