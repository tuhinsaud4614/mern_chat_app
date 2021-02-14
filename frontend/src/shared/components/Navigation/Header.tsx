import { FC, useState, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { NotificationsNone } from "@material-ui/icons";

import RouteNames from "../../../util/routeNames";
import Logo from "../ui/Logo";
import { AppState } from "../../../store";
import { AuthState } from "../../../store/auth/types";
import { signOut } from "../../../store/auth/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  titleText: {
    color: theme.palette.grey[50],
  },
  userImg: {
    width: "30px",
    height: "30px",
  },
}));

const Header: FC = () => {
  const classes = useStyles();
  const { user } = useSelector<AppState, AuthState>((state) => state.auth);
  const rdxDispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const history = useHistory();
  const handleUserMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" classes={{ root: classes.root }} elevation={0}>
      <Toolbar>
        <div className={classes.title}>
          <Button onClick={() => history.push(RouteNames.Home)}>
            <Logo className={classes.titleText} />
          </Button>
        </div>
        <IconButton
          onClick={() => {
            history.push(RouteNames.Notification);
          }}
          style={{ marginRight: "8px" }}
        >
          <Badge badgeContent={4} color="secondary">
            <NotificationsNone />
          </Badge>
        </IconButton>
        <IconButton onClick={handleUserMenu}>
          <Avatar
            classes={{
              root: classes.userImg,
            }}
            alt={user.name}
            src={user.avatar}
          />
        </IconButton>
        <Menu
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
          keepMounted
        >
          <MenuItem
            onClick={() => {
              handleUserMenuClose();
              history.push(RouteNames.Home);
            }}
          >
            PROFILE
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleUserMenuClose();
              rdxDispatch(signOut());
            }}
          >
            LOGOUT
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
