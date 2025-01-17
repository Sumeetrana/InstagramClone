import { Typography } from "@material-ui/core";
import React from "react";
import { LoadingLargeIcon } from "../../icons";
import { useExploreGridStyles } from "../../styles";
// import { getDefaultPost } from "../../data";
import GridPost from "../shared/GridPost";
import { useQuery } from "@apollo/react-hooks";
import { EXPLORE_POSTS } from "../../graphql/queries";
import { UserContext } from "../../App";

function ExploreGrid() {
  const classes = useExploreGridStyles();
  const { followingIds } = React.useContext(UserContext);
  const variables = { followingIds };
  console.log(followingIds);
  const { data, loading } = useQuery(EXPLORE_POSTS, { variables });
  console.log(data);
  return (
    <>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        gutterBottom
        component="h2"
        className={classes.typography}
      >
        Explore
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
    </>
  );
}

export default ExploreGrid;
