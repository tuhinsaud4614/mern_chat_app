import { FC } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@material-ui/icons";

import { IUser } from "../../../shared/models";
import StatusAvatar from "../../../shared/components/StatusAvatar";

const useStyles = makeStyles((theme) =>
  createStyles({
    chatHeader: {
      display: "flex",
    },
    leftMenu: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    rightMenu: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    userBox: {
      paddingTop: 0,
      paddingBottom: 0,
      flexGrow: 1,
    },
  })
);

interface Props {
  user: IUser;
  ctrlChatDetailOpen(value: boolean): void;
  ctrlChatTabOpen(value: boolean): void;
}

const ChatHeader: FC<Props> = ({
  user,
  ctrlChatDetailOpen,
  ctrlChatTabOpen,
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.chatHeader} square>
      <IconButton
        color="secondary"
        className={classes.leftMenu}
        onClick={() => {
          ctrlChatTabOpen(true);
        }}
      >
        <MenuIcon />
      </IconButton>
      <ListItem component="div" className={classes.userBox}>
        <ListItemAvatar>
          <StatusAvatar avatar={user.avatar} name={user.name} />
        </ListItemAvatar>
        <ListItemText
          primary={user.name}
          secondary={
            <Typography variant="caption">Last Seen 3 min ago</Typography>
          }
        />
      </ListItem>
      <IconButton
        color="secondary"
        className={classes.rightMenu}
        onClick={() => {
          ctrlChatDetailOpen(true);
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatHeader;
