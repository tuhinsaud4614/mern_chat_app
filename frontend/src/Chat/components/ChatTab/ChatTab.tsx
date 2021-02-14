import { FC, useState, memo } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Divider,
  InputBase,
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import {
  makeStyles,
  fade,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import UserImg from "../../../img/user.jpg";
import ListItemLink from "../../../shared/components/ui/ListItemLink";
import SideBar from "../../../shared/components/Navigation/SideBar";

const useStyles = makeStyles<Theme, { tabCount: number }>((theme) =>
  createStyles({
    sidebarPaper: {
      width: 260,
      [theme.breakpoints.up("md")]: {
        position: "static",
        height: `calc(100vh - 64px)`,
      },
    },
    title: {
      padding: theme.spacing(0.5, 0.75),
      userSelect: "none",
    },
    tab: ({ tabCount }) => ({
      minWidth: `${100 / tabCount}%`,
    }),
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      background: fade(theme.palette.common.black, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      margin: theme.spacing(0.8),
    },
    searchIcon: {
      padding: theme.spacing(0, 0.5),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInputs: {
      padding: theme.spacing(1, 1, 1, 4),
      width: "100%",
    },
    notificationCount: {
      width: "30px",
      height: "30px",
      backgroundColor: theme.palette.primary.main,
      fontSize: theme.typography.body2.fontSize,
    },
  })
);

interface Props {
  chatTabOpen: boolean;
  ctrlChatTabOpen(value: boolean): void;
}

const ChatTab: FC<Props> = ({ chatTabOpen, ctrlChatTabOpen }) => {
  const classes = useStyles({ tabCount: 2 });
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { conversationId } = useParams<{ conversationId: string }>();

  const tabChanged = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <SideBar
      mobileHiddenBreakPoints={{ mdUp: true }}
      hiddenBreakPoints={{ smDown: true }}
      onMobileClosed={ctrlChatTabOpen}
      isMobileOpen={chatTabOpen}
      classes={{ paper: classes.sidebarPaper }}
    >
      <Typography
        className={classes.title}
        color="primary"
        component="h3"
        variant="h6"
      >
        Chat
      </Typography>
      <Divider />
      <Tabs value={tabIndex} onChange={tabChanged}>
        <Tab classes={{ root: classes.tab }} id="tab1" label="Friends" />
        <Tab classes={{ root: classes.tab }} id="tab2" label="Groups" />
      </Tabs>
      <Divider />
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInputs,
          }}
        />
      </div>
      <Divider />
      <List>
        {["user1", "user2", "user3"].map((item: string) => (
          <ListItemLink
            key={item}
            to={`/conversation/${item}`}
            selected={item === conversationId}
          >
            <ListItemAvatar>
              <Avatar src={UserImg} alt={item} />
            </ListItemAvatar>
            <ListItemText
              style={{ overflow: "hidden" }}
              primary={item}
              secondary={
                <Typography
                  component="p"
                  variant="body2"
                  color="textPrimary"
                  noWrap
                >
                  Lorem, ipsum dolor sit amethhhhh
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Avatar className={classes.notificationCount}>{1}</Avatar>
            </ListItemSecondaryAction>
          </ListItemLink>
        ))}
      </List>
    </SideBar>
  );
};

export default memo(
  ChatTab,
  (prevProps, nextProps) => prevProps.chatTabOpen === nextProps.chatTabOpen
);
