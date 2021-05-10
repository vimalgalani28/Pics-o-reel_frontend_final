import React, { useEffect, useState } from "react";
import MicrosoftLogin from "react-microsoft-login";
import { Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import axios from "axios";
import { loginUser } from "../actions/user";
import { setMyEntries } from "../actions/myEntry";

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
    fontWeight: '700',
    fontStyle: 'normal',
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
    fontStyle: 'italic',
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
    fontStyle: 'italic',
    lineHeight: 1.7,
    margin: '0 auto',
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    }
  }
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
      url: "https://pics-api.pictoreal.in/user/login",
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
        const newOptions = {
          method: "GET",
          url: "https://pics-api.pictoreal.in/entry",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const res2 = await axios(newOptions);
        if (!res2.data.error) {
          props.dispatch(setMyEntries(res2.data));
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
            <p className={classes.subHeading} style={{ color: 'white' }}>An Annual Art & Photography Exhibition Cum Competition.</p>
          </h1>
          <MicrosoftLogin
            clientId="bf8681db-1c8d-4f9f-8d94-14deca9788a4"
            authCallback={authHandler}
          />
        </div>
      </Collapse>
    </div>
  );
};

export default connect()(LoginPage);
