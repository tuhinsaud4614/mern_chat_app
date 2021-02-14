import {
  CONVERSATION_ACTION_ERROR,
  CONVERSATION_ACTION_FETCH,
  CONVERSATION_ACTION_PENDING,
  IConversationState,
  IConversationActions,
} from "./types";

const initialState: IConversationState = {
  conversations: [],
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
        errors: [],
      };
    default:
      return state;
  }
}

export default reducer;
