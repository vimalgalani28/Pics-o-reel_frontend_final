import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";

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
    color: "hsl(42, 78%, 60%)",
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
    margin: "0 auto",
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

const LoginPage = (props) => {
  const classes = useStyles();
  const [count, setCount] = useState();
  useEffect(() => {
    const fetchCount = async () => {
      const token = JSON.parse(localStorage.getItem("picsjwt"));

      const newOptions = {
        method: "GET",
        url: "https://pics-o-reel-api.herokuapp.com/entries/count/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios(newOptions);
        console.log(res.data);

        setCount(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCount();
  }, []);
  return (
    <div className={classes.full} id="header">
      {count ? (
        <div className={classes.container}>
          <h1 className={classes.colorText}>
            Hello {count.name.split("_")[1]},
          </h1>

          <br></br>
          <h1
            style={{
              color: "hsl(43, 89%, 70%)",
            }}
          >
            Users: {count.users}
          </h1>
          <h1
            style={{
              color: "hsl(43, 89%, 70%)",
            }}
          >
            Entries: {count.entries}
          </h1>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};

export default connect()(LoginPage);
