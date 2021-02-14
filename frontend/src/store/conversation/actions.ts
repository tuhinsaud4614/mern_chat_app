import crypto from "crypto";

import { AppThunk } from "..";
import userImg from "../../img/user.jpg";

import {
  CONVERSATION_ACTION_ERROR,
  CONVERSATION_ACTION_FETCH,
  CONVERSATION_ACTION_PENDING,
  IConversation,
} from "./types";

function exampleApi<T>(data: T, duration: number = 1000): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, duration);
  });
}
const demoType: ["GROUP", "FRIEND"] = ["GROUP", "FRIEND"];

export const fetchConversations = (): AppThunk<Promise<void | string>> => {
  return async (dispatch) => {
    dispatch({
      type: CONVERSATION_ACTION_PENDING,
    });
    try {
      const data = await exampleApi<IConversation[]>(
        Array.from({ length: 15 }, (item, index) => ({
          id:index === 0 ? "friend1" : index.toString(),
          receiver: "user",
          sender: {
            id: Date.now().toString(),
            avatar: userImg,
            name: crypto.randomBytes(5).toString("hex"),
            type:
              index === 0 ? "FRIEND" : demoType[Math.floor(Math.random() * 2)],
          },
        }))
      );
      dispatch({
        type: CONVERSATION_ACTION_FETCH,
        conversations: data,
      });
      let lastChattedConId = data.find((con) => con.sender.type === "FRIEND");
      if (lastChattedConId) {
        return lastChattedConId.id;
      }
    } catch (e) {
      console.log("Fetch conversation Error", e);
      dispatch({
        type: CONVERSATION_ACTION_ERROR,
        errors: [
          {
            code: 500,
            msg: "Fetching Conversations Failed",
            date: new Date().toISOString(),
          },
        ],
      });
    }
  };
};
