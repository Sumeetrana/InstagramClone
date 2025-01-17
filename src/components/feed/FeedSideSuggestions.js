import { Paper, Typography } from "@material-ui/core";
import React from "react";
// import { getDefaultUser } from "../../data";
import { useFeedSideSuggestionsStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import FollowButton from "../shared/FollowButton";
import { LoadingIcon } from "../../icons";
import { useQuery } from "@apollo/react-hooks";
import { SUGGEST_USERS } from "../../graphql/queries";
import { UserContext } from "../../App";

function FeedSideSuggestions() {
  const classes = useFeedSideSuggestionsStyles();
  const { followerIds, followingIds } = React.useContext(UserContext);
  const variables = {
    limit: 5,
    followerIds,
    followingIds,
    createdAt: "2021-01-07T04:24:45.208517+00:00",
    // createdAt: me.created_at
  };
  const { data, loading } = useQuery(SUGGEST_USERS, { variables });

  return (
    <article className={classes.article}>
      <Paper className={classes.paper}>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          component="h2"
          align="left"
          gutterBottom
          className={classes.typography}
        >
          Suggestions For you
        </Typography>
        {loading ? (
          <LoadingIcon />
        ) : (
          data.users.map((user) => (
            <div key={user.id} className={classes.card}>
              <UserCard user={user} />
              <FollowButton id={user.id} side />
            </div>
          ))
        )}
      </Paper>
    </article>
  );
}

export default FeedSideSuggestions;
