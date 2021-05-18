import React, { useEffect, useState } from "react";
import MicrosoftLogin from "react-microsoft-login";
import { Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import axios from "axios";
import { loginUser } from "../actions/user";
import { setAllEntries } from "../actions/allEntry";

const useStyles = makeStyles((theme) => ({
  full: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    fontFamily: "'Gilda Display', Sans-serif",
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
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  const authHandler = async (err, data, msal) => {
    if (err) {
      return "Auth Failed!";
    }
    const options = {
      method: "POST",
      url: "https://picsoreel-api-voting.herokuapp.com/user/login",
      data: {
        idToken: data.idToken.rawIdToken,
      },
    };
    try {
      const res = await axios(options);
      if (!res.data.error) {
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem("picsjwt", JSON.stringify(token));
        props.dispatch(loginUser(user));
        // setLoginError("");
        const allEntriesAPI = {
          method: "GET",
          url: "https://picsoreel-api-voting.herokuapp.com/entries/allentries",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const res2 = await axios(allEntriesAPI);
        // console.log(res.data);
        // setAllSubEntries(res.data);

        const shuffleEntries = (array) => {
          var currentIndex = array.length,
            temporaryValue,
            randomIndex;
          while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
          return array;
        };
        const shuffledEntries = shuffleEntries(res2.data);

        if (!res2.data.error) {
          props.dispatch(setAllEntries(shuffledEntries));
        }
      } else {
        if (res.data.status === 401) {
          // setLoginError(res.data.error);
          msal.logout();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.full} id="header">
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
          <br></br>
          <MicrosoftLogin
            clientId="bf8681db-1c8d-4f9f-8d94-14deca9788a4"
            authCallback={authHandler}
          />
          <br></br>
          <p
            className={classes.subHeading}
            style={{
              fontSize: "15px",
              color: "var(--clr-primary-8)",
              fontWeight: "500",
            }}
          >
            Use credentials provided by college (Ex.
            abc@pictsctr.onmicrosoft.com or xyz@ms.pict.edu)
          </p>
        </div>
      </Collapse>
    </div>
  );
};

export default connect()(LoginPage);
