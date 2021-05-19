import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Collapse, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  full: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    // fontFamily: "'Montserrat', sans-serif"
  },

  colorText: {
    fontSize: "500%",
    fontWeight: "700",
    fontStyle: "normal",
    color: "hsl(43, 89%, 70%)",
    [theme.breakpoints.down("xs")]: {
      fontSize: "340%",
    },
  },
  container: {
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: "2rem",
    fontWeight: 500,
    fontStyle: "italic",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  },
  subHeading: {
    fontSize: "2rem",
    fontWeight: 500,
    fontStyle: "italic",
    lineHeight: 1.7,
    width: "90%",
    margin: "0 auto",
    marginTop: "10px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  },
}));

const Main = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  const handleClick = () => history.push("/create");

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <>
      <div className={classes.full}>
        <Collapse
          in={checked}
          {...(checked ? { timeout: 1000 } : {})}
          collapsedHeight={50}
        >
          <div className={classes.container}>
            <h1 className={classes.title}>
              Pictoreal presents<br></br>
              <span className={classes.colorText}>Pics-o-reel</span>
              <p className={classes.subHeading} style={{ color: "white" }}>
                An Annual Art & Photography Exhibition Cum Competition.
              </p>
            </h1>

            <Scroll to="header" smooth={true}>
              <IconButton>
                <ExpandMoreIcon
                  style={{ fontSize: "70", color: "hsl(42, 78%, 60%)" }}
                />
              </IconButton>
            </Scroll>
            <br></br>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Submit Your Entry
            </Button>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Main;
