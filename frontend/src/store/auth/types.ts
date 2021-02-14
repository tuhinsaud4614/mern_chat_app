import { ActionError } from "../types";

export const AUTH_ACTION_SIGN_UP = "AUTH_ACTION_SIGN_UP";
export const AUTH_ACTION_SIGN_IN = "AUTH_ACTION_SIGN_IN";
export const AUTH_ACTION_AUTO_SIGN_IN = "AUTH_ACTION_AUTO_SIGN_IN";
export const AUTH_ACTION_SIGN_OUT = "AUTH_ACTION_SIGN_OUT";
export const AUTH_ACTION_PENDING = "AUTH_ACTION_PENDING";
export const AUTH_ACTION_ERROR = "AUTH_ACTION_ERROR";

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  token: string;
  expiration: string;
}

export interface AuthState {
  user: IUser;
  loading: boolean;
  errors: ActionError[];
}

export interface AuthActionPending {
  type: typeof AUTH_ACTION_PENDING;
}

export interface AuthActionError {
  type: typeof AUTH_ACTION_ERROR;
  errors: ActionError[];
}

export interface SignUp {
  type: typeof AUTH_ACTION_SIGN_UP;
}

export interface SignIn {
  type: typeof AUTH_ACTION_SIGN_IN;
  user: IUser;
}

export interface AutoSignIn {
  type: typeof AUTH_ACTION_AUTO_SIGN_IN;
}

export interface SignOut {
  type: typeof AUTH_ACTION_SIGN_OUT;
}

export type AuthActions =
  | AutoSignIn
  | SignUp
  | SignIn
  | SignOut
  | AuthActionPending
  | AuthActionError;
