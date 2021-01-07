import React, { useState } from "react";
import { useFeedPageStyles } from "../styles";
import Layout from "../components/shared/Layout";
import UserCard from "../components/shared/UserCard";
// import { getDefaultPost } from "../data";
// import FeedPost from "../components/feed/FeedPost";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";
import { Hidden, Typography } from "@material-ui/core";
import LoadingScreen from "../components/shared/LoadingScreen";
import { LoadingLargeIcon } from "../icons";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton";
import { UserContext } from "../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_FEED } from "../graphql/queries";
import usePageBottom from "../utils/usePageBottom";
import FollowSuggestions from "../components/shared/FollowSuggestions";
import { Add } from "@material-ui/icons";

const FeedPost = React.lazy(() => import("../components/feed/FeedPost"));

function FeedPage() {
  const classes = useFeedPageStyles();
  const [isEndOfFeed, setEndOfFeed] = useState(false);
  const { me, feedIds } = React.useContext(UserContext);
  const variables = {
    feedIds,
    limit: 2,
  };
  const { data, loading, fetchMore } = useQuery(GET_FEED, { variables });
  const isPageBottom = usePageBottom();

  const handleUpdateQuery = React.useCallback((prev, { fetchMoreResult }) => {
    // console.log({ prev, fetchMoreResult });
    if (fetchMoreResult.posts.length === 0) {
      setEndOfFeed(true);
      return prev;
    }
    return { posts: [...prev.posts, ...fetchMoreResult.posts] };
  }, []);

  React.useEffect(() => {
    if (!isPageBottom || !data) {
      return;
    }
    const lastTimestamp = data.posts[data.posts.length - 1].created_at;
    const variables = { limit: 2, feedIds, lastTimestamp };
    fetchMore({
      variables,
      updateQuery: handleUpdateQuery,
    });
  }, [isPageBottom, data, handleUpdateQuery, fetchMore, feedIds]);

  if (data && data.posts.length === 0) {
    return (
      <Layout>
        <div
          className={classes.container}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="body1"
            component="h1"
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "900px",
              width: "100%",
              margin: "50px auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Add style={{ fontSize: "50px" }} />
            <Typography varinat="body2" component="h2">
              Start Following & Start Sharing.
            </Typography>
            <Typography variant="subtitle2" component="span">
              Write Your Own Story
            </Typography>
          </Typography>
          <FollowSuggestions />
        </div>
      </Layout>
    );
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <div className={classes.container}>
        {/* Feed Posts */}
        <div>
          {data.posts.map((post, index) => (
            <React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
              <FeedPost post={post} index={index} />
            </React.Suspense>
          ))}
        </div>
        {/* Sidebar */}
        <Hidden smDown>
          <div className={classes.sidebarContainer}>
            <div className={classes.sidebarWrapper}>
              <UserCard user={me} avatarSize={50} />
              <FeedSideSuggestions />
            </div>
          </div>
        </Hidden>
        {!isEndOfFeed && <LoadingLargeIcon />}
      </div>
    </Layout>
  );
}

export default FeedPage;
