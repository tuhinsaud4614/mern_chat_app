import { FC, Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

import { AppState } from "./store";
import { AuthState } from "./store/auth/types";
import { autoSignIn } from "./store/auth/actions";
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
        "*::-webkit-scrollbar-track": {
          boxShadow: `inset 0 0 6px rgba(0,0,0,0.3)`,
          backgroundColor: "#F5F5F5",
          // borderRadius: "10px",
        },
        "*::-webkit-scrollbar": {
          width: "10px",
          backgroundColor: "#F5F5F5",
        },
        "*::-webkit-scrollbar-thumb": {
          // borderRadius: "10px",
          width: "10px",
          backgroundColor: purple[500],
          backgroundImage: `-webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent)`,
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
  const { user } = useSelector<AppState, AuthState>((state) => state.auth);
  const rdxDispatch = useDispatch();

  useEffect(() => {
    rdxDispatch(autoSignIn());
  }, [rdxDispatch]);

  const routes = user.token ? (
    <Fragment>
      <Header />
      <Switch>
        <Route path={RouteNames.Notification} exact>
          <Notification />
        </Route>
        <Route path={RouteNames.Chat}>
          <Home />
        </Route>
        <Redirect to={"/conversation/user1"} />
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
