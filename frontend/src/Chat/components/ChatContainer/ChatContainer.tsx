import { FC, memo, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { AppDispatch, AppState } from "../../../store";
import { addMessage, fetchMessages } from "../../../store/chat/actions";
import { ChatState } from "../../../store/chat/types";
import { IConversationState } from "../../../store/conversation/types";
import userImg from "../../../img/user.jpg";
import ChatContainerSkeleton from "../Skeleton/ChatContainerSkeleton";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatDetail from "./ChatDetail";
import Message from "./Message";

const useStyles = makeStyles((theme) =>
  createStyles({
    chatContainer: {
      height: "inherit",
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
  const rdxDispatch = useDispatch<AppDispatch>();
  const { loading, messages, errors } = useSelector<AppState, ChatState>(
    (state) => state.chat
  );

  const { lastConversationId } = useSelector<AppState, IConversationState>(
    (state) => state.conversation
  );

  useEffect(() => {
    if (lastConversationId) {
      rdxDispatch(fetchMessages(lastConversationId));
    }
  }, [rdxDispatch, lastConversationId]);

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
  console.log("[ChatContainer]");
  if (loading || messages.length === 0) {
    return <ChatContainerSkeleton />;
  }
  if (errors.length) {
    return <div>{errors[0].msg}</div>;
  }
  console.log(lastConversationId);
  return (
    <>
      {/* Main Chat Start */}
      <Grid
        xs
        item
        container
        direction="column"
        className={classes.chatContainer}
      >
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
      {/* Main Chat End */}
      {/* Main Detail Start */}
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
      {/* Main Chat End */}
    </>
  );
};

export default memo(
  ChatContainer,
  (prevProps, nextProps) =>
    prevProps.chatDetailOpen === nextProps.chatDetailOpen
);
