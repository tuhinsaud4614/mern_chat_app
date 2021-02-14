import { FC, memo, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { AppState } from "../../../store";
import { addMessage, fetchMessages } from "../../../store/chat/actions";
import { ChatState } from "../../../store/chat/types";
import userImg from "../../../img/user.jpg";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatDetail from "./ChatDetail";
import Message from "./Message";

const useStyles = makeStyles((theme) =>
  createStyles({
    chatContainer: {
      height: "inherit",
      display: "flex",
      flexDirection: "column",
    },
    chatContent: {
      flex: 1,
      overflowX: "hidden",
      overflowY: "auto",
      background: `#ffffd8`,
    },
  })
);

interface Props {
  chatDetailOpen: boolean;
  ctrlChatDetailOpen(value: boolean): void;
  ctrlChatTabOpen(value: boolean): void;
}

const ChatContainer: FC<Props> = ({
  chatDetailOpen,
  ctrlChatDetailOpen,
  ctrlChatTabOpen,
}) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const classes = useStyles();
  const rdxDispatch = useDispatch();
  const { loading, messages, errors } = useSelector<AppState, ChatState>(
    (state) => state.chat
  );

  useEffect(() => {
    rdxDispatch(fetchMessages());
  }, [rdxDispatch]);

  useEffect(() => {
    listRef.current?.scroll({
      left: 0,
      top: listRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const addMsg = (msg: string, img: string, dateTime: Date): void => {
    rdxDispatch(
      addMessage({
        id: messages.length.toString(),
        avatar: userImg,
        msg: msg,
        img: img,
        creator: "user1",
        createdAt: dateTime,
      })
    );
  };
  // console.log("[ChatContainer]: ", { messages, errors, loading });
  if (loading) {
    return <div>Loading....</div>;
  }
  if (errors.length) {
    return <div>{errors[0].msg}</div>;
  }

  return (
    <>
      <Grid xs item className={classes.chatContainer}>
        <ChatHeader
          user={{
            id: "user1",
            name: "user",
            email: "x@gmail.com",
            avatar: userImg,
            lastOnline: new Date().toISOString(),
          }}
          ctrlChatTabOpen={ctrlChatTabOpen}
          ctrlChatDetailOpen={ctrlChatDetailOpen}
        />
        <div className={classes.chatContent} ref={listRef}>
          {messages.map((item) => (
            <Message
              key={item.id}
              id={item.id}
              msg={item.msg}
              img={item.img}
              avatar={item.avatar}
              creator={item.creator}
              dateTime={item.createdAt}
            />
          ))}
        </div>
        <ChatFooter addMsg={addMsg} />
      </Grid>
      <Grid item style={{ height: "inherit" }}>
        <ChatDetail
          chatDetailOpen={chatDetailOpen}
          ctrlChatDetailOpen={ctrlChatDetailOpen}
          photos={messages.reduce(
            (prev, item) => (item.img ? [...prev, item.img] : prev),
            [] as string[]
          )}
        />
      </Grid>
    </>
  );
};

export default memo(
  ChatContainer,
  (prevProps, nextProps) =>
    prevProps.chatDetailOpen === nextProps.chatDetailOpen
);
