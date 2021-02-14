import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

import authReducer from "./auth/reducer";
import chatReducer from "./chat/reducer";
import { AuthActions } from "./auth/types";
import { ChatActions } from "./chat/types";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

const composeEnhancers =
  (window && (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
  compose;

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = AuthActions | ChatActions;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
  )
);

export default store;
