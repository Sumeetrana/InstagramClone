import { useMutation } from "@apollo/react-hooks";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { UserContext } from "../../App";
import { FOLLOW_USERS, UNFOLLOW_USER } from "../../graphql/mutations";
import { useFollowButtonStyles } from "../../styles";

function FollowButton({ side, id }) {
  const classes = useFollowButtonStyles({ side });
  const { currentUserId, followingIds } = React.useContext(UserContext);
  const isAlreadyFollowing = followingIds.some(
    (followingId) => followingId === id
  );
  const [isFollowing, setFollowing] = useState(isAlreadyFollowing);
  const [followUser] = useMutation(FOLLOW_USERS);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const variables = {
    userIdToFollow: id,
    currentUserId,
  };

  function handleFollowUser() {
    setFollowing(true);
    followUser({ variables });
  }

  function handleUnfollowUser() {
    setFollowing(false);
    unfollowUser({ variables });
  }

  const followButton = (
    <Button
      variant={side ? "text" : "contained"}
      color="primary"
      className={classes.button}
      onClick={handleFollowUser}
      fullWidth
    >
      Follow
    </Button>
  );

  const followingButton = (
    <Button
      variant={side ? "text" : "outlined"}
      className={classes.button}
      onClick={handleUnfollowUser}
      fullWidth
    >
      Following
    </Button>
  );

  return isFollowing ? followingButton : followButton;
}

export default FollowButton;
