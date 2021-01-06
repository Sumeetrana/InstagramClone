import React, { useState } from "react";
import { usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import {
  CommentIcon,
  MoreIcon,
  ShareIcon,
  UnlikeIcon,
  LikeIcon,
  RemoveIcon,
  SaveIcon,
} from "../../icons";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  Hidden,
  TextField,
  Typography,
} from "@material-ui/core";
import OptionsDialog from "../shared/OptionsDialog";
// import { defaultPost } from "../../data";
import PostSkeleton from "./PostSkeleton";
import { useSubscription } from "@apollo/react-hooks";
import { GET_POST } from "../../graphql/subscriptions";

function Post({ postId }) {
  const classes = usePostStyles();
  // const [loading, setLoading] = useState(true);
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);
  const variables = { postId };
  const { data, loading } = useSubscription(GET_POST, { variables });

  // setTimeout(() => {
  //   setLoading(false);
  // }, 2000);
  if (loading) {
    return <PostSkeleton />;
  }

  const {
    media,
    id,
    likes,
    location,
    likes_aggregate,
    user,
    caption,
    comments,
    created_at,
  } = data.posts_by_pk;

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        {/* post header */}
        <div className={classes.postHeader}>
          <UserCard user={user} location={location} avatarSize={32} />
          <MoreIcon
            className={classes.moreIcon}
            onClick={() => setShowOptionsDialog(true)}
          />
        </div>
        {/* post image */}
        <div className={classes.postImage}>
          <img src={media} alt="Post media" className={classes.image} />
        </div>
        {/* Post Buttons */}
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton />
          </div>
          <Typography className={classes.likes} variant="subtitle2">
            <span>
              {likes_aggregate.aggregate.count === 1
                ? "1 like"
                : `${likes_aggregate.aggregate.count} likes`}
            </span>
          </Typography>
          <div
            style={{
              overflowY: "scroll",
              padding: "16px 12px",
              height: "100%",
            }}
          >
            <AuthorCaption
              user={user}
              createdAt={created_at}
              caption={caption}
            />
            {comments.map((comment) => (
              <UserComment key={comment.id} comment={comment} />
            ))}
          </div>
          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
          <Hidden xsDown>
            <div className={classes.comment}>
              <Divider />
              <Comment />
            </div>
          </Hidden>
        </div>
      </article>
      {showOptionsDialog && (
        <OptionsDialog onClose={() => setShowOptionsDialog(false)} />
      )}
    </div>
  );
}

function AuthorCaption({ user, caption, createdAt }) {
  const classes = usePostStyles();
  return (
    <div style={{ display: "flex" }}>
      <Avatar
        src={user.profile_image}
        alt="User avatar"
        style={{ marginRight: "14px", width: "32px", height: "32px" }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={user.username}>
          <Typography
            variant="subtitles2"
            component="span"
            className={classes.username}
          >
            {user.username}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            className={classes.postCaption}
            style={{ paddingLeft: 0 }}
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        </Link>
        <Typography
          style={{ marginTop: 16, marginBottom: 4, display: "inline-block" }}
          color="textSecondary"
          variant="caption"
        >
          {createdAt}
        </Typography>
      </div>
    </div>
  );
}

function UserComment({ comment }) {
  const classes = usePostStyles();
  return (
    <div style={{ display: "flex" }}>
      <Avatar
        src={comment.user.profile_image}
        alt="User avatar"
        style={{ marginRight: "14px", width: "32px", height: "32px" }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={comment.user.username}>
          <Typography
            variant="subtitles2"
            component="span"
            className={classes.username}
          >
            {comment.user.username}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            className={classes.postCaption}
            style={{ paddingLeft: 0 }}
          >
            {comment.content}
          </Typography>
        </Link>
        <Typography
          style={{ marginTop: 16, marginBottom: 4, display: "inline-block" }}
          color="textSecondary"
          variant="caption"
        >
          {comment.created_at}
        </Typography>
      </div>
    </div>
  );
}

function LikeButton() {
  const classes = usePostStyles();
  const [liked, setLiked] = React.useState(false);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;

  function handleLike() {
    console.log("like");
    setLiked(true);
  }

  function handleUnlike() {
    console.log("unlike");
    setLiked(false);
  }

  return <Icon className={className} onClick={onClick} />;
}

function SaveButton() {
  const classes = usePostStyles();
  const [saved, setSaved] = React.useState(false);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const onClick = saved ? handleRemove : handleSaved;

  function handleSaved() {
    console.log("save");
    setSaved(true);
  }

  function handleRemove() {
    console.log("remove");
    setSaved(false);
  }

  return <Icon className={classes.saveIcon} onClick={onClick} />;
}

function Comment() {
  const classes = usePostStyles();
  const [content, setContent] = useState("");
  return (
    <div className={classes.commentContainer}>
      <TextField
        fullWidth
        value={content}
        placeholder="Add a comment..."
        multiline
        rowsMax={2}
        rows={1}
        onChange={(event) => setContent(event.target.value)}
        className={classes.textField}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline,
          },
        }}
      />
      <Button
        color="primary"
        className={classes.commentButton}
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>
  );
}

export default Post;
