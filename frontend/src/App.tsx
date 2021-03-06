// import { FC, Fragment, useEffect } from "react";
import { FC, Fragment } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

// import { AppState } from "./store";
// import { AuthState } from "./store/auth/types";
// import { autoSignIn } from "./store/auth/actions";
import RouteNames from "./util/routeNames";
import Header from "./shared/components/Navigation/Header";
import Home from "./Chat/pages/Home";
import Notification from "./Chat/pages/Notification";
import SignUp from "./Auth/pages/SignUp";
import SignIn from "./Auth/pages/SignIn";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          backgroundColor: "#F5F5F5",
          width: "8px",
        },
        "*::-webkit-scrollbar-track": {
          boxShadow: `inset 0 0 6px rgba(0,0,0,0.3)`,
          backgroundColor: "#F5F5F5",
          width: "8px",
        },
        "*::-webkit-scrollbar-thumb": {
          border: ` 4px solid ${purple[200]}`,
        },
      },
    },
  },
  palette: {
    primary: {
      main: purple[500],
    },
  },
});

const App: FC = () => {
  // const { user } = useSelector<AppState, AuthState>((state) => state.auth);
  // const rdxDispatch = useDispatch();

  // useEffect(() => {
  //   rdxDispatch(autoSignIn());
  // }, [rdxDispatch]);

  const routes = true ? (
    <Fragment>
      <Header />
      <Switch>
        <Route path={RouteNames.Home} exact>
          <Home />
        </Route>
        <Route path={RouteNames.Notification} exact>
          <Notification />
        </Route>
        {/* <Route path={RouteNames.Chat} exact>
          <Conversation />
        </Route> */}
        <Redirect to={RouteNames.Home} />
      </Switch>
    </Fragment>
  ) : (
    <Container component="main" maxWidth="xs">
      <Switch>
        <Route path={RouteNames.SignIn} exact>
          <SignIn />
        </Route>
        <Route path={RouteNames.SignUp} exact>
          <SignUp />
        </Route>
        <Redirect to={RouteNames.SignIn} />
      </Switch>
    </Container>
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routes}
      </ThemeProvider>
    </Router>
  );
};

export default App;
