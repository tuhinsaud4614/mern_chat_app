import { FC, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Divider,
  InputBase,
  List,
  ListItem,
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

import { AppDispatch, AppState } from "../../../store";
import { IConversationState } from "../../../store/conversation/types";
import { selectConversation } from "../../../store/conversation/actions";
import SideBar from "../../../shared/components/Navigation/SideBar";
import ChatTabSkeleton from "../Skeleton/ChatTabSkeleton";

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
  const rdxDispatch = useDispatch<AppDispatch>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { loading, conversations, lastConversationId } = useSelector<
    AppState,
    IConversationState
  >((state) => state.conversation);

  const tabChanged = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  const onChangeCon = (id: string) => {
    rdxDispatch(selectConversation(id));
  };

  const filteredConversations =
    tabIndex === 0
      ? conversations.filter((item) => item.sender.type === "FRIEND")
      : conversations.filter((item) => item.sender.type === "GROUP");

  return (
    <SideBar
      mobileHiddenBreakPoints={{ mdUp: true }}
      hiddenBreakPoints={{ smDown: true }}
      onMobileClosed={ctrlChatTabOpen}
      isMobileOpen={chatTabOpen}
      classes={{ paper: classes.sidebarPaper }}
    >
      {loading ? (
        <ChatTabSkeleton />
      ) : (
        <>
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
            {filteredConversations.length > 0 &&
              filteredConversations.map((item) => (
                <ListItem
                  key={item.id}
                  onClick={() => onChangeCon(item.id)}
                  selected={item.id === lastConversationId}
                  button
                >
                  <ListItemAvatar>
                    <Avatar src={item.sender.avatar} alt={item.sender.name} />
                  </ListItemAvatar>
                  <ListItemText
                    style={{ overflow: "hidden" }}
                    primary={item.sender.name}
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
                </ListItem>
              ))}
          </List>
        </>
      )}
    </SideBar>
  );
};

export default memo(
  ChatTab,
  (prevProps, nextProps) => prevProps.chatTabOpen === nextProps.chatTabOpen
);
