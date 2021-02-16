import { ActionError } from "../types";

export const CONVERSATION_ACTION_ERROR = "CONVERSATION_ACTION_ERROR";
export const CONVERSATION_ACTION_FETCH = "CONVERSATION_ACTION_FETCH";
export const CONVERSATION_ACTION_PENDING = "CONVERSATION_ACTION_PENDING";
export const CONVERSATION_ACTION_SELECT = "CONVERSATION_ACTION_SELECT";

export interface IConversation {
  id: string;
  receiver: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    type: "GROUP" | "FRIEND";
  };
}

export interface IConversationState {
  conversations: IConversation[];
  lastConversationId: string | null;
  loading: boolean;
  errors: ActionError[];
}

export interface IConversationActionPending {
  type: typeof CONVERSATION_ACTION_PENDING;
}

export interface IConversationActionError {
  type: typeof CONVERSATION_ACTION_ERROR;
  errors: ActionError[];
}

export interface IConversationActionFetch {
  type: typeof CONVERSATION_ACTION_FETCH;
  conversations: IConversation[];
  lastConversationId: string | null;
}

export interface IConversationActionSelect {
  type: typeof CONVERSATION_ACTION_SELECT;
  conId: string;
}

export type IConversationActions =
  | IConversationActionPending
  | IConversationActionError
  | IConversationActionFetch
  | IConversationActionSelect;
