import React from "react";
import { useLoadingScreenStyles } from "../../styles";
import { LogoLoadingIcon } from "../../icons";
function LoadingScreen() {
  const classes = useLoadingScreenStyles();

  // let loading = true;
  return (
    <section className={classes.section}>
      <span>
        <LogoLoadingIcon />
      </span>
    </section>
  );
}

export default LoadingScreen;
