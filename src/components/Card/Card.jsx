import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 180,
    [theme.breakpoints.up("md")]: {
      minWidth: 450,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    backgroundSize: "contain",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const EntryCard = ({ entry, userAvatar }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {userAvatar}
          </Avatar>
        }
        title={entry.title}
        subheader={moment(entry.createdAt).format("MMMM D, YYYY")}
      />
      <CardMedia className={classes.media} image={entry.imageThumbLink} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {entry.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
};

export default EntryCard;
