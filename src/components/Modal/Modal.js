import React from "react";
// import { Modal, Button } from "react-bootstrap";
import {
  Modal,
  Slide,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "./modal.css";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    width: "95%",
    margin: "20px auto",
  },
});

const MyModal = ({ open, handleClose, logoutHandler }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      className={classes.root}
    >
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <div className="modal-main">
          <div className="close-button">
            <IconButton onClick={handleClose}>
              <CloseIcon style={{ color: "#fd6a02", fontSize: "40px" }} />
            </IconButton>
          </div>
          <div className="links-mobile-container">
            <span onClick={handleClose} style={{ margin: "5px auto" }}>
              <NavLink
                to="/dashboard"
                exact={true}
                activeClassName="active"
                className="links"
              >
                Home
              </NavLink>
            </span>
            <span onClick={handleClose} style={{ margin: "5px auto" }}>
              <NavLink
                to="/entries"
                exact={true}
                activeClassName="active"
                className="links"
              >
                Entries
              </NavLink>
            </span>
            <span onClick={handleClose} style={{ margin: "5px auto" }}>
              <NavLink
                to="/wishlist"
                exact={true}
                activeClassName="active"
                className="links"
              >
                Wishlist
              </NavLink>
            </span>
            <span onClick={handleClose} style={{ margin: "5px auto" }}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSec2RvLzYqeWZ-gkKzfXciO7Z9aXyLFNTqWV0npTTQXD71gDQ/viewform"
                target="_blank"
                rel="noreferrer"
                className="links"
              >
                Feedback
              </a>
            </span>
            <span
              onClick={handleClose}
              style={{ margin: "5px auto", marginBottom: "20px" }}
            >
              <Button variant="contained" onClick={logoutHandler}>
                Logout
              </Button>
            </span>
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default MyModal;
