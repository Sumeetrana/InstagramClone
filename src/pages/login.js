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

function LoginPage() {
  const classes = useLoginPageStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit, watch, formState } = useForm({ mode: "all" });
  const hasPassword = watch("password");

  function onSubmit(data) {
    console.log(data);
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

  const facebookIcon =
    iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite;

  return (
    <Button fullWidth color={color} variant={variant}>
      <img
        src={facebookIcon}
        alt="Facebook Icon"
        className={classes.facebookIcon}
      />
      Log In with Facebook
    </Button>
  );
}

export default LoginPage;
