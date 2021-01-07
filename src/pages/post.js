import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/shared/Layout";
import Post from "../components/post/Post";
import MorePostsFromUser from "../components/post/MorePostsFromUser";
import { useSubscription } from "@apollo/react-hooks";
import { GET_POST } from "../graphql/subscriptions";
import PostSkeleton from "../components/post/PostSkeleton";

function PostPage() {
  const { postId } = useParams();
  const variables = { postId };
  const { data, loading } = useSubscription(GET_POST, { variables });
  if (loading) {
    return <PostSkeleton />;
  }
  const user = data.posts_by_pk.user;
  return (
    <Layout>
      <Post postId={postId}></Post>
      <MorePostsFromUser postId={postId} user={user} />
    </Layout>
  );
}

export default PostPage;
