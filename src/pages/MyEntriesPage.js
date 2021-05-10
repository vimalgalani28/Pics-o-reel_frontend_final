import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EntryCard from "../components/Card/Card";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

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
    fontSize: "100%",
    color: "hsl(43, 89%, 70%)",
  },
  containerText: {
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: "4.5rem",
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

const MyEntriesPage = (props) => {
  const paintings = props.myEntries.filter(
    (entry) => entry.section === "Painting"
  );
  const photographies = props.myEntries.filter(
    (entry) => entry.section === "Photography"
  );
  const calligraphies = props.myEntries.filter(
    (entry) => entry.section === "Calligraphy"
  );
  const userAvatar = props.user.displayName.split("_")[1][0];
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
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
          <Tab label="Painting" {...a11yProps(0)} />
          <Tab label="Photography" {...a11yProps(1)} />
          <Tab label="Calligraphy" {...a11yProps(2)} />
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
          {
            paintings.length === 0 &&
            <div className={classes.containerText}>
              <h1 className={classes.title}>
                <br></br>
                <span className={classes.colorText}>You haven't submitted entry in this section</span>
              </h1>
            </div>
          }
          <Grid container spacing={4}>
            {paintings.map((paint) => {
              return (
                <Grid item xs={12} sm={6} key={paint._id}>
                  <EntryCard entry={paint} userAvatar={userAvatar} />
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          dir={theme.direction}
          className={classes.container}
        >
          {
            photographies.length === 0 &&
            <div className={classes.containerText}>
              <h1 className={classes.title}>
                <br></br>
                <span className={classes.colorText}>You haven't submitted entry in this section</span>
              </h1>
            </div>
          }
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
                  <EntryCard entry={photo} userAvatar={userAvatar} />
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
        <TabPanel
          value={value}
          index={2}
          dir={theme.direction}
          className={classes.container}
        >
          {
            calligraphies.length === 0 &&
            <div className={classes.containerText}>
              <h1 className={classes.title}>
                <br></br>
                <span className={classes.colorText}>You haven't submitted entry in this section</span>
              </h1>
            </div>
          }
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
                  <EntryCard entry={calli} userAvatar={userAvatar} />
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  myEntries: state.myEntry,
});

export default connect(mapStateToProps)(MyEntriesPage);
