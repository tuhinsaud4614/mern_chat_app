import { FC, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";


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
  const [chatTabOpen, setChatTabOpen] = useState<boolean>(false);
  const [chatDetailOpen, setChatDetailOpen] = useState<boolean>(false);

  const toggleChatTabDrawer = (value: boolean) => setChatTabOpen(value);
  const toggleChatDetailDrawer = (value: boolean) => setChatDetailOpen(value);
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
