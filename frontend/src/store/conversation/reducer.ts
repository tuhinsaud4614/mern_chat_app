import {
  CONVERSATION_ACTION_ERROR,
  CONVERSATION_ACTION_FETCH,
  CONVERSATION_ACTION_PENDING,
  CONVERSATION_ACTION_SELECT,
  IConversationState,
  IConversationActions,
} from "./types";

const initialState: IConversationState = {
  conversations: [],
  lastConversationId: null,
  errors: [],
  loading: false,
};

function reducer(
  state = initialState,
  action: IConversationActions
): IConversationState {
  switch (action.type) {
    case CONVERSATION_ACTION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CONVERSATION_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        errors: [...action.errors],
      };
    case CONVERSATION_ACTION_FETCH:
      return {
        conversations: action.conversations,
        loading: false,
        lastConversationId: action.lastConversationId,
        errors: [],
      };
    case CONVERSATION_ACTION_SELECT:
      return {
        ...state,
        lastConversationId: action.conId,
      };
    default:
      return state;
  }
}

export default reducer;
