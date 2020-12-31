import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useFollowButtonStyles } from "../../styles";

function FollowButton({ side }) {
  const classes = useFollowButtonStyles({ side });
  const [isFollowing, setFollowing] = useState(false);

  const followButton = (
    <Button
      variant={side ? "text" : "container"}
      color="primary"
      className={classes.button}
      onClick={() => setFollowing(true)}
      fullWidth
    >
      Follow
    </Button>
  );

  const followingButton = (
    <Button
      variant={side ? "outlined" : "text"}
      className={classes.button}
      onClick={() => setFollowing(false)}
      fullWidth
    >
      following
    </Button>
  );

  return isFollowing ? followingButton : followButton;
}

export default FollowButton;
