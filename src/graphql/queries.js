import { gql } from "apollo-boost";

export const CHECK_IF_USERNAME_TAKEN = gql`
  query checkIfUsernameTaken($username: String!) {
    users(where: { username: { _eq: $username } }) {
      username
    }
  }
`;

export const GET_USER_EMAIL = gql`
  query getUserEmail($input: String!) {
    users(
      where: {
        _or: [{ phone_number: { _eq: $input } }, { username: { _eq: $input } }]
      }
    ) {
      email
    }
  }
`;

export const GET_EDIT_USER_PROFILE = gql`
  query getEditUserProfile($id: uuid!) {
    users_by_pk(id: $id) {
      id
      email
      bio
      name
      phone_number
      profile_image
      username
      website
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($query: String) {
    users(
      where: {
        _or: [{ username: { _ilike: $query } }, { name: { _ilike: $query } }]
      }
    ) {
      id
      name
      username
      profile_image
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getUserProfile($username: String!) {
    users(where: { username: { _eq: $username } }) {
      bio
      id
      name
      profile_image
      username
      website
      posts_aggregate {
        aggregate {
          count
        }
      }
      followers_aggregate {
        aggregate {
          count
        }
      }
      following_aggregate {
        aggregate {
          count
        }
      }
      saved_posts(order_by: { created_at: desc }) {
        post {
          id
          media
          likes_aggregate {
            aggregate {
              count
            }
          }
          comments_aggregate {
            aggregate {
              count
            }
          }
        }
      }
      posts(order_by: { created_at: desc }) {
        id
        media
        likes_aggregate {
          aggregate {
            count
          }
        }
        comments_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

// suggest users from followers & also users creted around the same time
// export const SUGGEST_USERS = gql`
//   query suggestUsers(
//     $limit: Int!
//     $followerIds: [uuid!]!
//     $createdAt: timestamptz!
//   ) {
//     users(
//       limit: $limit
//       where: {
//         _or: [
//           { id: { _in: $followerIds } }
//           { created_at: { _gt: $createdAt } }
//         ]
//       }
//     ) {
//       id
//       username
//       name
//       profile_image
//     }
//   }
// `;

export const SUGGEST_USERS = gql`
  query suggestUsers(
    $limit: Int!
    $followerIds: [uuid!]!
    $createdAt: timestamptz!
    $followingIds: [uuid!]!
  ) {
    users(
      limit: $limit
      where: {
        _or: [
          { id: { _in: $followerIds } }
          { created_at: { _gt: $createdAt } }
        ]
        _and: { id: { _nin: $followingIds } }
      }
    ) {
      id
      username
      name
      profile_image
    }
  }
`;

export const EXPLORE_POSTS = gql`
  query explorePosts($followingIds: [uuid!]!) {
    posts(
      order_by: {
        created_at: desc
        likes_aggregate: { count: desc }
        comments_aggregate: { count: desc }
      }
      where: { user_id: { _nin: $followingIds } }
    ) {
      id
      media
      likes_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_MORE_POSTS_FROM_USERS = gql`
  query getMorePostsFromUsers($id: uuid!, $postId: uuid!) {
    posts(
      where: { user_id: { _eq: $id }, _not: { id: { _eq: $postId } } }
      limit: 6
    ) {
      id
      media
      likes_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_FEED = gql`
  query getFeed($limit: Int!, $feedIds: [uuid!]!, $lastTimestamp: timestamptz) {
    posts(
      limit: $limit
      where: { user_id: { _in: $feedIds }, created_at: { _lt: $lastTimestamp } }
      order_by: { created_at: desc }
    ) {
      id
      caption
      created_at
      media
      location
      user {
        id
        username
        name
        profile_image
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      likes {
        id
        user_id
      }
      saved_posts {
        id
        user_id
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      comments(order_by: { created_at: desc }, limit: 2) {
        id
        content
        created_at
        user {
          username
        }
      }
    }
  }
`;
