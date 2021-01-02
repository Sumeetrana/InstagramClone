import { Hidden, Typography } from "@material-ui/core";
import React from "react";
import { useExploreSuggestionsStyles } from "../../styles";
import FollowSuggestion from "../shared/FollowSuggestions";

function ExploreSuggestions() {
  const classes = useExploreSuggestionsStyles();

  return (
    <Hidden xsDown>
      <div className={classes.container}>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          component="h2"
          className={classes.typography}
        >
          Discover People
        </Typography>
        <FollowSuggestion hideHeader={true} />
      </div>
    </Hidden>
  );
}

export default ExploreSuggestions;
