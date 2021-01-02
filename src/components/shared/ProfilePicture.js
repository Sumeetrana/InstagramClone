import React from "react";
import { useProfilePictureStyles } from "../../styles";

function ProfilePicture({
  size,
  image = "https://images.unsplash.com/photo-1609518726036-d683cc25eef4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=410&q=80",
  isOwner,
}) {
  const classes = useProfilePictureStyles();

  return <div>ProfilePicture</div>;
}

export default ProfilePicture;
