import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    outline: "none",
    alignItems: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalroot: {
    width: "50%",
    minHeight: "70%",
    margin: "auto",
    padding: "auto",
    outline: "none",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
  },
}));

const ImageModal = ({ image, open, setOpen }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div
          className={classes.modalroot}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "contain",
          }}
        >
          <div
            style={{
              position: "relative",
              top: "0%",
              left: "85%",
              color: "white",
            }}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon
                style={{
                  color: "white",
                  fontSize: "3.2rem",
                  fontWeight: "bold",
                }}
              />
            </IconButton>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ImageModal;
