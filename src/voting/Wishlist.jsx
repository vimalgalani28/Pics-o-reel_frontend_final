import React, { useState } from "react";
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
import { Button, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Avatar from "@material-ui/core/Avatar";
// import moment from "moment";
import { connect } from "react-redux";
import CheckBoxTwoToneIcon from "@material-ui/icons/CheckBoxTwoTone";
import CheckBoxOutlineBlankTwoToneIcon from "@material-ui/icons/CheckBoxOutlineBlankTwoTone";
import { addInVote, deleteInVote } from "../actions/voteList";
import CustomizedSnackbar from "../components/Snackbar/Snackbar";
import { WifiLoader } from "react-awesome-loaders";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import ImageModal from "./ImageModal/ImageModal";
import TopButton from "../components/TopButton/TopButton";
// import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

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
  const [formLoader, setFormLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [image, setImage] = useState("");

  const [openVotePaint, setOpenVotePaint] = useState(
    props.user.hasVotedPainting
  );
  const [openVotePhoto, setOpenVotePhoto] = useState(
    props.user.hasVotedPhotography
  );
  const [openVoteIndependence, setopenVoteIndependence] = useState(
    props.user.hasVotedIndependence
  );
  const [voteError, setVoteError] = useState("");

  const giveVote = async (section) => {
    setDialogbox(false);
    setFormLoader(true);
    if (props.voteEntries.length <= 3) {
      setVoteError("");
      const vote = props.voteEntries.map((entry) => {
        return entry._id;
      });
      console.log(vote);

      const token = JSON.parse(localStorage.getItem("picsjwt"));
      const options = {
        method: "POST",
        url: "https://pics-o-reel-api.herokuapp.com/vote/",
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
        if (res.data) {
          if (res.data.error) {
            setVoteError(res.data.error);
          }
          switch (section) {
            case "independence":
              console.log("trued!");
              props.user.hasVotedIndependence = true;
              setopenVoteIndependence(true);
              break;
            case "painting":
              props.user.hasVotedPainting = true;
              setOpenVotePaint(true);
              break;
            case "photography":
              props.user.hasVotedPhotography = true;
              setOpenVotePhoto(true);
              break;
            default:
              break;
          }
        }
        vote.map((id) => {
          return props.dispatch(deleteInVote(id));
        });
        setOpen(true);
        setFormLoader(false);
        // console.log("Deleted All");
        // setOpen(false);
      } catch (e) {
        console.log("Error", e);
      }
    } else {
      setVoteError("You can select maximum 3 entries!");
    }
  };

  const handleAddVoteList = (entry) => {
    console.log(entry);

    if (!entry.vote) {
      props.dispatch(addInVote(entry));
    } else {
      props.dispatch(deleteInVote(entry._id));
    }
    entry.vote = !entry.vote;
    console.log(props.voteEntries);
  };

  const paintings = props.myWishEntries.filter(
    (entry) => entry.section === "Painting"
  );
  const photographies = props.myWishEntries.filter(
    (entry) => entry.section === "Photography"
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

  const [dialogbox, setDialogbox] = useState(false);

  const handleClickOpen = (section) => {
    console.log(section);

    if (props.voteEntries.length === 0) {
      setVoteError("Select atleast 1 entry!");
    } else if (
      props.voteEntries.length <= 3 &&
      props.voteEntries.every(
        (entry) => entry.section.toLowerCase() === section
      )
    ) {
      if (section === "independence") {
        console.log("yess", props.voteEntries.length);
        if (props.voteEntries.length === 1) {
          console.log("yess");
          setVoteError("");
          setDialogbox(true);
        } else {
          setVoteError("You Can Select Maximum 1 Entry!");
        }
      } else {
        console.log(section);
        setVoteError("");
        setDialogbox(true);
      }
    } else if (
      !props.voteEntries.every(
        (entry) => entry.section.toLowerCase() === section
      )
    ) {
      setVoteError("You can vote entries from only 1 section at a time!");
    } else {
      setVoteError("You Can Select Maximum 3 Entries!");
    }
  };

  const handleClose = () => {
    setDialogbox(false);
  };

  const history = useHistory();
  const handleClick = () => history.push("/entries");

  window.onscroll = function () {
    scrollFunction();
  };
  const [button, setButton] = useState(false);
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setButton(true);
    } else {
      setButton(false);
    }
  }

  return (
    <>
      <div id="top">
        <div className="entries">
          <CustomizedSnackbar
            open={open}
            setOpen={setOpen}
            title="Voted Succesfully!"
          />

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
              <Tab label="Independence Day Special" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          {!formLoader ? (
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
                {paintings.length === 0 && !openVotePaint && (
                  <div className={classes.containerText}>
                    <h1 className={classes.title}>
                      <br></br>
                      <span className={classes.colorText}>
                        Select Paintings & Sketches from the entry section!
                      </span>
                      <br></br>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                      >
                        Entries
                      </Button>
                    </h1>
                  </div>
                )}
                {!openVotePaint ? (
                  <>
                    <Grid container spacing={4}>
                      {paintings.map((paint) => {
                        return (
                          <Grid item xs={12} sm={6} key={paint._id}>
                            <Card className={classesCard.root}>
                              <CardHeader
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
                              />
                              <CardMedia
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setOpenImage(true);
                                  setImage(paint.imageBucketLink);
                                }}
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
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                    <div className={classes.containerText}>
                      <h1 className={classes.title}>
                        <br></br>
                        <span className={classes.colorText}>{voteError}</span>
                      </h1>
                    </div>
                    {paintings.length !== 0 ? (
                      <>
                        <div className={classes.containerText}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => handleClickOpen("painting", e)}
                          >
                            Vote!
                          </Button>
                        </div>

                        <Dialog
                          open={dialogbox}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Are you sure?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              You can only vote once for each category!
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              No
                            </Button>
                            <Button
                              onClick={(e) => giveVote("painting", e)}
                              color="primary"
                              autoFocus
                            >
                              Yes
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <div className={classes.containerText}>
                    <h1 className={classes.title}>
                      <br></br>
                      <span className={classes.colorText}>
                      You can only vote once for each category!
                      </span>
                    </h1>
                  </div>
                )}
              </TabPanel>
              <TabPanel
                value={value}
                index={1}
                dir={theme.direction}
                className={classes.container}
              >
                {photographies.length === 0 && !openVotePhoto && (
                  <div className={classes.containerText}>
                    <h1 className={classes.title}>
                      <br></br>
                      <span className={classes.colorText}>
                        Select Photographs from the entry section!
                      </span>
                      <br></br>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                      >
                        Entries
                      </Button>
                    </h1>
                  </div>
                )}
                {!openVotePhoto ? (
                  <>
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
                                action={
                                  <Button
                                    color="primary"
                                    aria-label="add to wishlist"
                                    onClick={(e) => handleAddVoteList(photo, e)}
                                  >
                                    {props.voteEntries ? (
                                      props.voteEntries.some(
                                        (entry) => entry._id === photo._id
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
                                title={photo.title}
                              />
                              <CardMedia
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setOpenImage(true);
                                  setImage(photo.imageBucketLink);
                                }}
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
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                    <div className={classes.containerText}>
                      <h1 className={classes.title}>
                        <br></br>
                        <span className={classes.colorText}>{voteError}</span>
                      </h1>
                    </div>

                    {photographies.length !== 0 ? (
                      <>
                        <div className={classes.containerText}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => handleClickOpen("photography", e)}
                          >
                            Vote!
                          </Button>
                        </div>
                        <Dialog
                          open={dialogbox}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Are you sure?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            You can only vote once for each category!
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              No
                            </Button>
                            <Button
                              onClick={(e) => giveVote("photography", e)}
                              color="primary"
                              autoFocus
                            >
                              Yes
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <div className={classes.containerText}>
                    <h1 className={classes.title}>
                      <br></br>
                      <span className={classes.colorText}>
                      You can only vote once for each category!
                      </span>
                    </h1>
                  </div>
                )}
              </TabPanel>

              <TabPanel
                value={value}
                index={2}
                dir={theme.direction}
                className={classes.container}
              >
                {independenceDayEntries.length === 0 && !openVoteIndependence && (
                  <div className={classes.containerText}>
                    <h1 className={classes.title}>
                      <br></br>
                      <span className={classes.colorText}>
                        Select entries from the independence day section!
                      </span>
                      <br></br>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                      >
                        Entries
                      </Button>
                    </h1>
                  </div>
                )}
                {!openVoteIndependence ? (
                  <>
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
                                action={
                                  <Button
                                    color="primary"
                                    aria-label="add to wishlist"
                                    onClick={(e) => handleAddVoteList(calli, e)}
                                  >
                                    {props.voteEntries ? (
                                      props.voteEntries.some(
                                        (entry) => entry._id === calli._id
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
                                title={calli.title}
                              />
                              <CardMedia
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setOpenImage(true);
                                  setImage(calli.imageBucketLink);
                                }}
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
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>

                    <div className={classes.containerText}>
                      <h1 className={classes.title}>
                        <br></br>
                        <span className={classes.colorText}>{voteError}</span>
                      </h1>
                    </div>

                    {independenceDayEntries.length !== 0 ? (
                      <>
                        <div className={classes.containerText}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => handleClickOpen("independence", e)}
                          >
                            Vote!
                          </Button>
                        </div>

                        <Dialog
                          open={dialogbox}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Are you sure?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            You can only vote once for each category!
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              No
                            </Button>
                            <Button
                              onClick={(e) => giveVote("independence", e)}
                              color="primary"
                              autoFocus
                            >
                              Yes
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <div className={classes.containerText}>
                    <h1 className={classes.title}>
                      <br></br>
                      <span className={classes.colorText}>
                      You can only vote once for each category!
                      </span>
                    </h1>
                  </div>
                )}
              </TabPanel>
            </SwipeableViews>
          ) : (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <WifiLoader
                background={"transparent"}
                desktopSize={"150px"}
                mobileSize={"150px"}
                text={"..."}
                backColor="transparent"
                frontColor="#00ccff"
              />
            </div>
          )}
        </div>
      </div>

      <ImageModal image={image} open={openImage} setOpen={setOpenImage} />
      <TopButton button={button} />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  myWishEntries: state.wishlist,
  allEntries: state.allEntries,
  voteEntries: state.voteList,
});

export default connect(mapStateToProps)(AllEntries);
