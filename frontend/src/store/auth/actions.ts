import { ThunkAction } from "redux-thunk";

import userImg from "../../img/user.jpg";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../util";
import { AppState } from "..";
import {
  AuthActions,
  AUTH_ACTION_ERROR,
  AUTH_ACTION_PENDING,
  AUTH_ACTION_SIGN_IN,
  AUTH_ACTION_SIGN_OUT,
  AUTH_ACTION_SIGN_UP,
  IUser,
} from "./types";

let logoutTimer: NodeJS.Timeout;

function exampleApi<T>(data: T, duration: number = 1000): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, duration);
  });
}

export function signOut(): AuthActions {
  removeFromLocalStorage("userData");
  clearTimeout(logoutTimer);
  return {
    type: AUTH_ACTION_SIGN_OUT,
  };
}

export function authTimeout(
  duration: number
): ThunkAction<void, AppState, unknown, AuthActions> {
  return (dispatch) => {
    logoutTimer = setTimeout(() => {
      dispatch(signOut());
    }, duration);
  };
}

export function signIn(
  email: string,
  password: string
): ThunkAction<void, AppState, unknown, AuthActions> {
  return async (dispatch) => {
    dispatch({
      type: AUTH_ACTION_PENDING,
    });
    try {
      const signOutTime = Date.now() + 6000 * 20;
      const data = await exampleApi<IUser>({
        id: Date.now().toString(),
        name: "user1",
        avatar: userImg,
        email: email,
        expiration: new Date(signOutTime).toISOString(),
        token: "Bearer ",
      });
      setToLocalStorage<IUser>("userData", data);
      dispatch({
        type: AUTH_ACTION_SIGN_IN,
        user: data,
      });
      dispatch(authTimeout(signOutTime - Date.now()));
    } catch (e) {
      console.log("Sign In Error", e);
      dispatch({
        type: AUTH_ACTION_ERROR,
        errors: [
          { code: 500, msg: "Login Failed", date: new Date().toISOString() },
        ],
      });
    }
  };
}

export function signUp(
  name: string,
  email: string,
  password: string,
  cb: () => void
): ThunkAction<void, AppState, unknown, AuthActions> {
  return async (dispatch) => {
    dispatch({
      type: AUTH_ACTION_PENDING,
    });
    try {
      await exampleApi<{
        name: string;
        email: string;
        password: string;
      }>(
        {
          name: name,
          email: email,
          password: password,
        },
        2000
      );
      dispatch({
        type: AUTH_ACTION_SIGN_UP,
      });
      cb();
    } catch (e) {
      console.log("Sign up Error", e);
      dispatch({
        type: AUTH_ACTION_ERROR,
        errors: [
          { code: 500, msg: "Sign up Failed", date: new Date().toISOString() },
        ],
      });
    }
  };
}

export function autoSignIn(): ThunkAction<
  void,
  AppState,
  unknown,
  AuthActions
> {
  return (dispatch) => {
    const localData = getFromLocalStorage<IUser>("userData");
    if (localData && localData.token && localData.expiration) {
      const expireTime = new Date(localData.expiration);
      if (expireTime <= new Date()) {
        dispatch(signOut());
      } else {
        dispatch({
          type: AUTH_ACTION_SIGN_IN,
          user: localData,
        });
        dispatch(authTimeout(expireTime.getTime() - new Date().getTime()));
      }
    } else {
      dispatch(signOut());
    }
  };
}
