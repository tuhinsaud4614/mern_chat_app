import { FC } from "react";
// import { makeStyles, createStyles } from "@material-ui/core/styles";
import ChatContainerSkeleton from "../components/Skeleton/ChatContainerSkeleton";

interface Props {}

// const useStyles = makeStyles((theme) =>
//   createStyles({

//   })
// );

const Notification: FC<Props> = () => {
  return <ChatContainerSkeleton />;
};

export default Notification;
