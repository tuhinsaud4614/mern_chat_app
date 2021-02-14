import { FC, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Drawer, Grid, IconButton, Hidden } from "@material-ui/core";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@material-ui/icons";

// import userImg from "../../img/user.jpg";

interface Props {}

const useStyles = makeStyles((theme) =>
  createStyles({
    home: {
      marginTop: theme.spacing(2),
      height: `calc(100vh - 64px - ${theme.spacing(2)}px)`,
      background: "gray",
    },
    menuButton: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    menuButton1: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    drawer: {
      height: "100%",
      width: "260px",
    },
    paper: {
      // background: "red",
      [theme.breakpoints.up("md")]: {
        position: "static",
        height: "100%",
        width: "260px",
      },
    },
    tempDrawer: {
      width: "260px",
      height: "100%",
    },
    detailPaper: {
      [theme.breakpoints.up("sm")]: {
        position: "static",
        height: "100%",
        width: "260px",
      },
    },
  })
);

const Notification: FC<Props> = () => {
  const classes = useStyles();
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggle1, setToggle1] = useState<boolean>(false);
  return (
    <Grid container className={classes.home}>
      <Grid item style={{ height: "inherit" }}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            open={toggle}
            onClose={() => setToggle(false)}
          >
            drawer2
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            className={classes.drawer}
            classes={{ paper: classes.paper }}
          >
            draer
          </Drawer>
        </Hidden>
      </Grid>
      <Grid item xs style={{ height: "inherit", background: "red" }}>
        <div>
          <IconButton
            className={classes.menuButton}
            onClick={() => {
              setToggle(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            className={classes.menuButton1}
            onClick={() => {
              setToggle1(true);
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
      </Grid>
      <Grid item style={{ height: "inherit" }}>
        <Hidden smUp implementation="css">
          <Drawer
            anchor="right"
            variant="temporary"
            open={toggle1}
            onClose={() => setToggle1(false)}
          >
            drawer2
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
            className={classes.drawer}
            classes={{ paper: classes.detailPaper }}
          >
            draer2
          </Drawer>
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default Notification;
