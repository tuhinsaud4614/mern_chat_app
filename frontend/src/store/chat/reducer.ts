import {
  ChatActions,
  ChatState,
  CHAT_ACTION_ADD_MESSAGE,
  CHAT_ACTION_ERROR,
  CHAT_ACTION_FETCH_MESSAGES,
  CHAT_ACTION_PENDING,
} from "./types";

const initialState: ChatState = {
  messages: [],
  loading: false,
  errors: [],
};

function reducer(state = initialState, action: ChatActions): ChatState {
  switch (action.type) {
    case CHAT_ACTION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CHAT_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        errors: [...action.errors],
      };
    case CHAT_ACTION_FETCH_MESSAGES:
      return {
        messages: action.messages,
        loading: false,
        errors: [],
      };
    case CHAT_ACTION_ADD_MESSAGE:
      return {
        messages: [...state.messages, action.message],
        loading: false,
        errors: [],
      };
    default:
      return state;
  }
}

export default reducer;
