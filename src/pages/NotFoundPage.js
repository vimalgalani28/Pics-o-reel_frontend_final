import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const NotFoundPage = () => {
  const history = useHistory();
  const handleClick = () => history.push("/dashboard");
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

  const classes = useStyles();

  return (
    <div className={classes.containerText}>
      <h1 className={classes.title}>
        <br></br>
        <span className={classes.colorText}>404 Not found</span>
      </h1>
      <Button
        variant="contained"
        color="hsl(42, 78%, 60%)"
        onClick={handleClick}
      >
        Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
