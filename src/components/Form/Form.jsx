import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import axios from "axios";
import CustomizedSnackbar from "../Snackbar/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { addMyEntry } from "../../actions/myEntry";
import { WifiLoader } from "react-awesome-loaders";
import { useHistory } from "react-router-dom";

const initialState = {
  avatar: null,
  title: "",
  description: "",
  section: "",
  contact: "",
};

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
    paddingTop: "27vh",
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

const Form = (props) => {
  const history = useHistory();
  let contact = "";
  // if (props.myEntries.length !== 0) {
  //   const lastEntry = props.myEntries[props.myEntries.length - 1];
  //   contact = lastEntry.ownerPhone;
  // }
  const classes = useStyles();
  initialState.contact = contact;
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [formFill, setFormFill] = useState(false);
  const [serverError, setServerError] = useState("");
  const [fileSizeError, setFileSizeError] = useState(false);
  const [formLoader, setFormLoader] = useState(false);

  const [dialogbox, setDialogbox] = useState(false);

  const handleClickOpen = () => {
    if (
      formData.avatar &&
      formData.title.trim() &&
      formData.description.trim() &&
      formData.section &&
      !invalidPhone
    ) {
      setDialogbox(true);
    } else {
      setFormFill(true);
    }
  };

  const handleClose = () => {
    setDialogbox(false);
  };

  const handleChangePhone = (value) => {
    if (value > 0 && !isNaN(value) && value.length === 10) {
      setInvalidPhone(false);
      setFormData({ ...formData, contact: value });
    } else {
      setInvalidPhone(true);
      setFormData({ ...formData, contact: value });
    }
  };

  const handleImageUpload = (value) => {
    if (value) {
      if (value.size > 7000000) {
        setFileSizeError(true);
        setFormData({ ...formData, avatar: "" });
      } else {
        setFileSizeError(false);
        setFormData({ ...formData, avatar: value });
      }
    }
  };

  const submitEntry = async () => {
    if (
      formData.avatar &&
      formData.title.trim() &&
      formData.description.trim() &&
      formData.section &&
      !invalidPhone
    ) {
      setFormFill(false);
      setFormLoader(true);
      const token = JSON.parse(localStorage.getItem("picsjwt"));
      var body = new FormData();
      body.append("avatar", formData.avatar);
      body.append("title", formData.title);
      body.append("description", formData.description);
      body.append("ownerPhone", formData.contact);
      body.append("section", formData.section);
      const options = {
        method: "POST",
        url: "http://localhost:5000/upload",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: body,
      };
      try {
        console.log();
        const res = await axios(options);
        if (!res.data.error) {
          props.dispatch(addMyEntry(res.data));
          setOpen(true);
          setFormData(initialState);
          setServerError("");
          setDialogbox(false);
          setFormLoader(false);
        } else {
          if (res.data.status === 500) {
            setServerError("There are some technical issues. Contact admin!");
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setFormFill(true);
    }
  };

  if (props.myEntries.length < 8) {
    return (
      <div>
        {!formLoader ? (
          <Grid
            item
            xs={12}
            md={8}
            sm={10}
            style={{
              alignContent: "center",
              display: "flex",
              flexWrap: "wrap",
              padding: "8%",
              margin: "auto",
              paddingTop: "140px",
            }}
          >
            <Card>
              <CardContent>
                <h2 style={{ textAlign: "center" }}>Pics-o-reel</h2>
                <Grid container spacing={2}>
                  <CustomizedSnackbar open={open} setOpen={setOpen} />
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      label="Contact No"
                      value={formData.contact}
                      fullWidth
                      onChange={(e) => handleChangePhone(e.target.value)}
                    />
                    {invalidPhone ? (
                      <FormHelperText style={{ color: "red" }}>
                        *Enter valid mobile number (w/o country code)
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label="Title"
                      fullWidth
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Section</InputLabel>
                      <Select
                        value={formData.section}
                        onChange={(e) =>
                          setFormData({ ...formData, section: e.target.value })
                        }
                      >
                        {[
                          "Painting",
                          "Photography",
                          "Calligraphy",
                          "Independence",
                        ].map((section) => {
                          const sectionEntries = props.myEntries.filter(
                            (entry) => entry.section === section
                          );
                          if (sectionEntries.length < 2) {
                            return (
                              <MenuItem value={section} key={section}>
                                {section === "Calligraphy"
                                  ? "Others"
                                  : section === "Painting"
                                  ? "Painting/Sketches"
                                  : section === "Photography"
                                  ? "Photography"
                                  : "Independence Day Special"}
                              </MenuItem>
                            );
                          }
                          return null;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      //   defaultValue="Default Value"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputLabel>Image</InputLabel>
                    <br></br>
                    <label
                      for="file-upload"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        display: "inline-block",
                        padding: "6px 12px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        accept="image/*"
                        type="file"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                      />
                    </label>
                    {fileSizeError ? (
                      <FormHelperText style={{ color: "red" }}>
                        *File size exceeded! Upload image less than 7MB.
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </Grid>
                  {serverError ? (
                    <FormHelperText style={{ color: "red" }}>
                      {serverError}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                  {formFill ? (
                    <FormHelperText style={{ color: "red" }}>
                      *Fill all the fields before submitting the form
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={handleClickOpen}
                    >
                      Submit
                    </Button>
                    <Dialog
                      open={dialogbox}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Entry once submitted can neither be edited nor be
                          removed!
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          No
                        </Button>
                        <Button onClick={submitEntry} color="primary" autoFocus>
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <WifiLoader
              background={"transparent"}
              desktopSize={"150px"}
              mobileSize={"150px"}
              text={"Submitting your entry..."}
              backColor="transparent"
              frontColor="#00ccff"
            />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={classes.containerText}>
        <h1 className={classes.title}>
          <br></br>
          <span className={classes.colorText}>
            Thank you for submitting your entries!
          </span>
        </h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("myEntries")}
        >
          View Your Entries
        </Button>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  myEntries: state.myEntry,
});

export default connect(mapStateToProps, null)(Form);
