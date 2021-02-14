import crypto from "crypto";
import { ThunkAction } from "redux-thunk";

import userImg from "../../img/user.jpg";
import { AppState } from "./../index";
import {
  ChatActions,
  CHAT_ACTION_ADD_MESSAGE,
  CHAT_ACTION_ERROR,
  CHAT_ACTION_FETCH_MESSAGES,
  CHAT_ACTION_PENDING,
  Message,
} from "./types";

const demoDates = [
  new Date(Date.now() - 60000 + 100),
  new Date(Date.now() - 3600000 + 100),
  new Date(Date.now() - 86400000 + 100),
  new Date(Date.now() - 86400000),
  new Date(Date.now() - 604800000),
];

function exampleApi<T>(data: T, duration: number = 1000): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, duration);
  });
}

export const fetchMessages = (): ThunkAction<
  void,
  AppState,
  unknown,
  ChatActions
> => {
  return async (dispatch) => {
    dispatch({
      type: CHAT_ACTION_PENDING,
    });
    try {
      const data = await exampleApi<Message[]>(
        Array.from({ length: 15 }, (item, index) => ({
          id: index.toString(),
          msg: crypto.randomBytes(20).toString("hex"),
          img: index !== 0 && index % 2 === 0 ? userImg : "",
          avatar: userImg,
          creator: index.toString(),
          createdAt: demoDates[Math.floor(Math.random() * 5)],
        }))
      );
      dispatch({
        type: CHAT_ACTION_FETCH_MESSAGES,
        messages: data,
      });
    } catch (e) {
      console.log("Fetch Messages Error", e);
      dispatch({
        type: CHAT_ACTION_ERROR,
        errors: [
          { code: 500, msg: "Fetching Failed", date: new Date().toISOString() },
        ],
      });
    }
  };
};

export function addMessage(
  msg: Message
): ThunkAction<void, AppState, unknown, ChatActions> {
  return async (dispatch) => {
    try {
      const data = await exampleApi<Message>(msg, 4000);
      dispatch({
        type: CHAT_ACTION_ADD_MESSAGE,
        message: data,
      });
    } catch (e) {
      console.log("Add Messages Error", e);
    }
  };
}
