import { ActionError } from "../types";

export const CHAT_ACTION_FETCH_MESSAGES = "CHAT_ACTION_FETCH_MESSAGES";
export const CHAT_ACTION_ADD_MESSAGE = "CHAT_ACTION_ADD_MESSAGE";
export const CHAT_ACTION_PENDING = "CHAT_ACTION_PENDING";
export const CHAT_ACTION_ERROR = "CHAT_ACTION_ERROR";

export interface Message {
  id: string;
  msg: string;
  img: string;
  avatar: string;
  creator: string;
  createdAt: Date;
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
  errors: ActionError[];
}

export interface ChatActionPending {
  type: typeof CHAT_ACTION_PENDING;
}

export interface ChatActionError {
  type: typeof CHAT_ACTION_ERROR;
  errors: ActionError[];
}

export interface FetchMessages {
  type: typeof CHAT_ACTION_FETCH_MESSAGES;
  messages: Message[];
}

export interface AddMessage {
  type: typeof CHAT_ACTION_ADD_MESSAGE;
  message: Message;
}

export type ChatActions =
  | FetchMessages
  | AddMessage
  | ChatActionPending
  | ChatActionError;
