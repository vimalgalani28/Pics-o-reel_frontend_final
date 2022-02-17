import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { green } from "@material-ui/core/colors";
import {
  deleteLeaderBoardEntries,
  setLeaderBoardEntries,
} from "../actions/leaderboard";
import { Redirect } from "react-router";
import LeaderBoardTable from "../components/LeaderBoardTable/LeaderBoardTable";
import {
  AppBar,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
  fade,
  FormControlLabel,
  Checkbox,
  withStyles,
  IconButton,
  Collapse,
  Grid,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp, Search } from "@material-ui/icons";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  appbar: {
    width: "97%",
    margin: "0 auto",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  searchMobile: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  change: {
    fontSize: "2rem",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  arrow: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  arrowIcon: {
    fontSize: "2rem",
    color: "white",
  },
  collapse: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  counts: {
    color: "hsl(43, 89%, 70%)",
    padding: ".6rem 0",
    fontSize: "2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const AdminPage = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [error, setError] = useState();
  const [searchText, setSearchText] = useState("");
  const [paintingCheck, setPaintingCheck] = useState(true);
  const [photographyCheck, setPhotographyCheck] = useState(true);
  const [paintingCount, setPaintingCount] = useState(0);
  const [photographyCount, setPhotographyCount] = useState(0);
  const [othersCount, setOthersCount] = useState(0);
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };
  const handlePaintingCheck = (e) => {
    setPaintingCheck(e.target.checked);
  };
  const handlePhotographyCheck = (e) => {
    setPhotographyCheck(e.target.checked);
  };
  const { setLeaderBoardEntries, deleteLeaderBoardEntries } = props;
  useEffect(() => {
    const fetchCount = async () => {
      const token = JSON.parse(localStorage.getItem("picsjwt"));

      const newOptions = {
        method: "GET",
        url: "https://picsoreel-api.pict-o-real.in/entries/leaderboard/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios(newOptions);
        if (res.data.error) {
          setError("This Page can only be accessed by admins!");
        } else {
          setLeaderBoardEntries(res.data.entries);
          setPaintingCount(res.data.paintingCount);
          setPhotographyCount(res.data.photographyCount);
          setOthersCount(res.data.othersCount);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchCount();
  }, [setLeaderBoardEntries, deleteLeaderBoardEntries]);

  useEffect(() => {
    return () => {
      deleteLeaderBoardEntries();
    };
  }, [setLeaderBoardEntries, deleteLeaderBoardEntries]);
  return (
    <div className="entries">
      {error && <Redirect to="/" />}
      <div className={classes.appbar}>
        <Grid container>
          <Grid item xs={6} md={3}>
            <Typography variant="h5" className={classes.counts}>
              Total Entries: {props.leaderboard.length}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h5" className={classes.counts}>
              Painting: {paintingCount}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h5" className={classes.counts}>
              Photography: {photographyCount}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h5" className={classes.counts}>
              Others: {othersCount}
            </Typography>
          </Grid>
          {/* <Grid item xs={6} md={3}>
            <Typography variant="h5" className={classes.counts}>
              Independence: {independenceCount}
            </Typography>
          </Grid> */}
        </Grid>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap>
              LeaderBoard
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={searchText}
                onChange={handleSearchText}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.change}>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={paintingCheck}
                    onChange={handlePaintingCheck}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Paintings/Sketches"
              />
            </div>
            <div className={classes.change}>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={photographyCheck}
                    onChange={handlePhotographyCheck}
                    name="checke"
                    color="primary"
                  />
                }
                label="Photography"
              />
            </div>
            <div className={classes.arrow}>
              {open ? (
                <IconButton onClick={() => setOpen(false)}>
                  <KeyboardArrowUp className={classes.arrowIcon} />
                </IconButton>
              ) : (
                <IconButton onClick={() => setOpen(true)}>
                  <KeyboardArrowDown className={classes.arrowIcon} />
                </IconButton>
              )}
            </div>
          </Toolbar>
          <Collapse in={open} direction="down" className={classes.collapse}>
            <Toolbar
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <div className={classes.searchMobile}>
                <div className={classes.searchIcon}>
                  <Search />
                </div>
                <InputBase
                  placeholder="Search..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={searchText}
                  onChange={handleSearchText}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      checked={paintingCheck}
                      onChange={handlePaintingCheck}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Paintings/Sketches"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      checked={photographyCheck}
                      onChange={handlePhotographyCheck}
                      name="checke"
                      color="primary"
                    />
                  }
                  label="Photography"
                />
              </div>
            </Toolbar>
          </Collapse>
        </AppBar>
        <LeaderBoardTable
          sectionEntries={props.leaderboard}
          searchText={searchText}
          paintingCheck={paintingCheck}
          photographyCheck={photographyCheck}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  leaderboard: state.leaderboardEntries,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setLeaderBoardEntries: (entries) => dispatch(setLeaderBoardEntries(entries)),
  deleteLeaderBoardEntries: () => dispatch(deleteLeaderBoardEntries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
