import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { AppState, AppDispatch } from "../../store";
import { IConversationState } from "../../store/conversation/types";
import { fetchConversations } from "../../store/conversation/actions";
import ChatTab from "../components/ChatTab/ChatTab";
import ChatContainer from "../components/ChatContainer/ChatContainer";

const useStyles = makeStyles((theme) =>
  createStyles({
    home: {
      height: `calc(100vh - 64px)`,
      overflowX: "hidden",
    },
    content: {
      height: "inherit",
      flexBasis: "100%",
    },
  })
);

const Home: FC = () => {
  const classes = useStyles();
  const rdxDispatch = useDispatch<AppDispatch>();
  const { errors } = useSelector<AppState, IConversationState>(
    (state) => state.conversation
  );

  const [chatTabOpen, setChatTabOpen] = useState<boolean>(false);
  const [chatDetailOpen, setChatDetailOpen] = useState<boolean>(false);

  const toggleChatTabDrawer = (value: boolean) => setChatTabOpen(value);
  const toggleChatDetailDrawer = (value: boolean) => setChatDetailOpen(value);

  useEffect(() => {
    rdxDispatch(fetchConversations());
  }, [rdxDispatch]);

  if (errors.length > 0) {
    return <div>Something went wrong</div>;
  }
  return (
    <Grid className={classes.home} container wrap="nowrap">
      <Grid item>
        <ChatTab
          chatTabOpen={chatTabOpen}
          ctrlChatTabOpen={toggleChatTabDrawer}
        />
      </Grid>
      <Grid xs item className={classes.content} container wrap="nowrap">
        <ChatContainer
          chatDetailOpen={chatDetailOpen}
          ctrlChatTabOpen={toggleChatTabDrawer}
          ctrlChatDetailOpen={toggleChatDetailDrawer}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
