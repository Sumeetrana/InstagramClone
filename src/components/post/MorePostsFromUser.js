import { Typography } from "@material-ui/core";
import React from "react";
import { LoadingLargeIcon } from "../../icons";
import { useMorePostsFromUserStyles } from "../../styles";
// import { getDefaultPost, defaultUser } from "../../data";
import GridPost from "../shared/GridPost";
import { Link } from "react-router-dom";
import { GET_MORE_POSTS_FROM_USERS } from "../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";

function MorePostsFromUser({ user, postId }) {
  const classes = useMorePostsFromUserStyles();
  const { id } = user;
  const variables = { id, postId };
  const { data, loading } = useQuery(GET_MORE_POSTS_FROM_USERS, { variables });
  // let loading = false;
  return (
    <div className={classes.container}>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        gutterBottom
        component="h2"
        className={classes.typography}
      >
        More posts from{" "}
        <Link to={`/${user.username}`} className={classes.link}>
          @{user.username}
        </Link>
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <article className={classes.article}>
          <div className={classes.postContainer}>
            {data.posts.map((post) => (
              <GridPost key={post.id} post={post} />
            ))}
          </div>
        </article>
      )}
    </div>
  );
}

export default MorePostsFromUser;
