import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  last: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
      paddingBottom: "200px",
    },
  },
  grid: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
  cardContent: {
    paddingTop: 0,
  },
  divider: {
    margin: "20px 0",
  },
}));
