import { FC, FormEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import RouteNames from "../../util/routeNames";
import { AppState } from "../../store";
import { AuthState } from "../../store/auth/types";
import { signIn } from "../../store/auth/actions";
import useForm from "../../shared/hooks/formHook";
import Input from "../../shared/components/ui/Input";
import ProgressButton from "../../shared/components/ui/ProgressButton";

const useStyles = makeStyles((theme) => ({
  errorList: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(0.5),
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
}));

const SignIn: FC = () => {
  const classes = useStyles();
  const rdxDispatch = useDispatch();
  const { loading, errors } = useSelector<AppState, AuthState>(
    (state) => state.auth
  );

  const [formState, changeHandler] = useForm({
    form: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    formIsValid: false,
  });

  const onSubmitted = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formState);
    rdxDispatch(
      signIn(formState.form["email"].value, formState.form["password"].value)
    );
  };

  return (
    <Paper className={classes.paper} variant="outlined">
      <Typography component="h1" color="primary" variant="h5" align="center">
        Login
      </Typography>
      {errors.length > 0 && (
        <div className={classes.errorList}>
          {errors.map((item, index) => (
            <Alert key={index} severity="error">
              {item.msg}
            </Alert>
          ))}
        </div>
      )}
      <form onSubmit={onSubmitted}>
        <Grid container>
          <Grid item xs={12}>
            <Input
              id="email"
              label="Email"
              errorText="Please enter valid email"
              onChanged={changeHandler}
              validators={[{ type: "REQUIRED" }, { type: "IS_EMAIL" }]}
              type="email"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="password"
              label="Password"
              errorText="Please enter valid password"
              onChanged={changeHandler}
              validators={[{ type: "REQUIRED" }]}
              type="password"
            />
          </Grid>
        </Grid>
        <ProgressButton
          customClass={classes.submit}
          loading={loading}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={loading || !formState.formIsValid}
        >
          Sign In
        </ProgressButton>
      </form>
      <Grid container justify="flex-end">
        <Grid item>
          <Link to={RouteNames.SignUp} variant="body2" component={RouterLink}>
            Create an account.
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SignIn;
