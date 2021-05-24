import React, { useState } from "react";
import MyModal from "../Modal/Modal";
import { Button, IconButton } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/user";
import "./navigation.css";
import { setMyEntries } from "../../actions/myEntry";
import MenuIcon from "@material-ui/icons/Menu";

function Navigation(props) {
  const [open, setOpen] = useState(false);
  const logoutHandler = async () => {
    const token = JSON.parse(localStorage.getItem("picsjwt"));
    const options = {
      method: "POST",
      url: "http://pics-o-reel-api.herokuapp.com/user/logout/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios(options);
      console.log(res.data);
      props.dispatch(logoutUser());
      props.dispatch(setMyEntries([]));
      localStorage.removeItem("picsjwt");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <header className="header">
        <div className="brand">
          <Link to="/">
            <img
              src="/assets/pictoreal.png"
              height="70"
              width="70"
              alt="pictoreal"
            />
          </Link>
        </div>
        <div className="link-container">
          <NavLink
            to="/dashboard"
            exact={true}
            activeClassName="active"
            className="links"
          ></NavLink>
          <NavLink
            to="/dashboard"
            exact={true}
            activeClassName="active"
            className="links"
          >
            Home
          </NavLink>
          <NavLink
            to="/entries"
            exact={true}
            activeClassName="active"
            className="links"
          >
            Entries
          </NavLink>
          <NavLink
            to="/wishlist"
            exact={true}
            activeClassName="active"
            className="links"
          >
            Wishlist
          </NavLink>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSec2RvLzYqeWZ-gkKzfXciO7Z9aXyLFNTqWV0npTTQXD71gDQ/viewform"
            target="_blank"
            rel="noreferrer"
            className="links"
          >
            Feedback
          </a>

          <Button variant="contained" onClick={logoutHandler}>
            Logout
          </Button>
        </div>
        <div className="icon-container">
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon style={{ color: "#fd6a02", fontSize: "40px" }} />
          </IconButton>
        </div>
      </header>
      <MyModal
        open={open}
        handleClose={() => setOpen(false)}
        logoutHandler={logoutHandler}
      />
    </>
  );
}

export default connect()(Navigation);
