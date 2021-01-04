import React from "react";
import SEO from "../components/shared/Seo";
import { useLoginPageStyles } from "../styles";
import {
  Button,
  Card,
  CardHeader,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import Link from "react-router-dom/Link";
import FacebookIconBlue from "../images/facebook-icon-blue.svg";
import FacebookIconWhite from "../images/facebook-icon-white.png";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";
import isEmail from "validator/lib/isEmail";
import { GET_USER_EMAIL } from "../graphql/queries";
import { AuthError } from "./signup";

function LoginPage() {
  const classes = useLoginPageStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const { logInWithEmailAndPassword } = React.useContext(AuthContext);
  const { register, handleSubmit, watch, formState } = useForm({ mode: "all" });
  const hasPassword = watch("password");
  const history = useHistory();
  const client = useApolloClient();

  async function onSubmit(data) {
    try {
      setError("");
      if (!isEmail(data.input)) {
        data.input = await getUserEmail(data.input);
        // console.log(data.input);
      }

      await logInWithEmailAndPassword(data.input, data.password);
      setTimeout(() => history.push("/"), 10);
    } catch (error) {
      console.error("Error signin ", error);
      handleError(error);
    }
  }

  function handleError(error) {
    if (error.code.includes("auth")) {
      setError(error.message);
    }
  }

  async function getUserEmail(input) {
    const response = await client.query({
      query: GET_USER_EMAIL,
      variables: { input },
    });
    const userEmail = response.data.users[0]?.email || "no@email.com";
    // console.log(userEmail);
    return userEmail;
  }

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <>
      <SEO title="Lognin" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name="input"
                fullWidth
                inputRef={register({
                  required: true,
                  minLength: 5,
                })}
                variant="filled"
                label="Phone number, username, or email"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                name="password"
                fullWidth
                inputRef={register({
                  required: true,
                  minLength: 5,
                })}
                InputProps={{
                  endAdornment: hasPassword && (
                    <InputAdornment>
                      <Button onClick={togglePassword}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                label="Password"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
              />
              <Button
                disabled={!formState.isValid || formState.isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Log In
              </Button>
            </form>
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <LoginWithFacebook color="secondary" iconColor="blue" />
            <AuthError error={error} />
            <Button fullWidth color="secondary">
              <Typography variant="caption">Forgot Password?</Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography align="right" variant="body2">
              Don't have an account?
            </Typography>
            <Link to="/accounts/emailsignup">
              <Button color="primary" className={classes.signupButton}>
                Sign up
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
}

export function LoginWithFacebook({ color, iconColor, variant }) {
  const classes = useLoginPageStyles();
  const { loginWithFacebook } = React.useContext(AuthContext);
  const [error, setError] = React.useState("");

  const facebookIcon =
    iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite;

  async function handleLoginWithFacebook() {
    try {
      await loginWithFacebook();
    } catch (error) {
      console.error("Error logging in with Facebook ", error);
      setError(error.message);
    }
  }

  return (
    <>
      <Button
        fullWidth
        color={color}
        variant={variant}
        onClick={handleLoginWithFacebook}
      >
        <img
          src={facebookIcon}
          alt="Facebook Icon"
          className={classes.facebookIcon}
        />
        Log In with Facebook
      </Button>
      <AuthError error={error} />
    </>
  );
}

export default LoginPage;
