import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Grid } from "@material-ui/core";
// import { makeStyles, createStyles } from "@material-ui/core/styles";

import { AppState, AppDispatch } from "../../store";
import { IConversationState } from "../../store/conversation/types";
import { fetchConversations } from "../../store/conversation/actions";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//
//   })
// );

const Home: FC = () => {
  // const classes = useStyles();
  const { replace } = useHistory();
  const rdxDispatch = useDispatch<AppDispatch>();
  const { loading, errors } = useSelector<AppState, IConversationState>(
    (state) => state.conversation
  );

  useEffect(() => {
    rdxDispatch(fetchConversations()).then((value) => {
      if (typeof value === "string") {
        replace(`/conversation/${value}`);
      }
    });
  }, [rdxDispatch, replace]);

  console.log("Home render");

  if (loading) {
    return <div>Loading...</div>;
  }
  if (errors.length > 0) {
    return <div>Something went wrong</div>;
  }
  return <div></div>;
};

export default Home;
