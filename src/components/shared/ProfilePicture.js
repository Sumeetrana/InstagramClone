import { useMutation } from "@apollo/react-hooks";
import { Person } from "@material-ui/icons";
import React from "react";
import { UserContext } from "../../App";
import { EDIT_USER_AVATAR } from "../../graphql/mutations";
import { useProfilePictureStyles } from "../../styles";
import handleImageUpload from "../../utils/handleImageUpload";

function ProfilePicture({
  size,
  image = "https://images.unsplash.com/photo-1609518726036-d683cc25eef4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=410&q=80",
  isOwner,
}) {
  const classes = useProfilePictureStyles({ size, isOwner });
  const { currentUserId } = React.useContext(UserContext);
  const inputRef = React.useRef();
  const [img, setImg] = React.useState(image);
  const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);
  function openFileInput() {
    inputRef.current.click();
  }

  async function handleUpdateProfilePic(event) {
    const url = await handleImageUpload(event.target.files[0]);
    const variables = { id: currentUserId, profileImage: url };

    await editUserAvatar({ variables });
    setImg(url);
  }

  return (
    <section className={classes.section}>
      <input
        style={{ display: "none" }}
        type="file"
        ref={inputRef}
        onChange={handleUpdateProfilePic}
      />
      {image ? (
        <div
          className={classes.wrapper}
          onClick={isOwner ? openFileInput : () => null}
        >
          <img src={img} alt="user profile" className={classes.image} />
        </div>
      ) : (
        <div className={classes.wrapper}>
          <Person className={classes.person} />
        </div>
      )}
    </section>
  );
}

export default ProfilePicture;
