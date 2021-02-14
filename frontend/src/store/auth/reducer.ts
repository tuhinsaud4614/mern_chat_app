import { getFromLocalStorage } from "../../util";
import {
  AuthState,
  AuthActions,
  AUTH_ACTION_ERROR,
  AUTH_ACTION_PENDING,
  AUTH_ACTION_SIGN_UP,
  AUTH_ACTION_SIGN_IN,
  AUTH_ACTION_SIGN_OUT,
  AUTH_ACTION_AUTO_SIGN_IN,
  IUser,
} from "./types";

const initialState: AuthState = {
  user: {
    id: "",
    name: "",
    email: "",
    avatar: "",
    token: "",
    expiration: "",
  },

  loading: false,
  errors: [],
};

function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AUTH_ACTION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        errors: [...action.errors],
      };
    case AUTH_ACTION_SIGN_UP:
      return {
        ...state,
        loading: false,
        errors: [],
      };
    case AUTH_ACTION_SIGN_OUT:
      return {
        user: {
          id: "",
          name: "",
          email: "",
          avatar: "",
          token: "",
          expiration: "",
        },
        loading: false,
        errors: [],
      };
    case AUTH_ACTION_SIGN_IN:
      return {
        user: { ...action.user },
        loading: false,
        errors: [],
      };
    case AUTH_ACTION_AUTO_SIGN_IN:
      const data = getFromLocalStorage<IUser>("userData");
      if (data) {
        return {
          user: data,
          loading: false,
          errors: [],
        };
      }
      return state;
    default:
      return state;
  }
}

export default reducer;
