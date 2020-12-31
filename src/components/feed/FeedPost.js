import React, { useState } from "react";
import { useFeedPostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import { CommentIcon, MoreIcon, ShareIcon } from "../../icons";
import { Link } from "react-router-dom";
import { Button, Divider, Hidden, Typography } from "@material-ui/core";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";

function FeedPost({ post }) {
  const classes = useFeedPostStyles();
  const [showCaption, setShowCaption] = useState(false);
  const { media, id, likes, user, caption, comments } = post;

  return (
    <>
      <article className={classes.article}>
        {/* Feed post header */}
        <div className={classes.postHeader}>
          <UserCard user={user} />
          <MoreIcon className={classes.MoreIcon} />
        </div>
        {/* Feed post image */}
        <div>
          <img src={media} alt="Post media" className={classes.image} />
        </div>
        {/* Feed Post Buttons */}
        <div className={classes.postButtonWrapper}>
          <div className={classes.postButtons}>
            <LikeButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton />
          </div>
          <Typography className={classes.like} variant="subtitle2">
            <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
          </Typography>
          <div className={showCaption ? classes.expanded : classes.collapsed}>
            <Link to={`/${user.username}`}>
              <Typography
                variant="subtitle2"
                component="span"
                className={classes.username}
              >
                {user.username}
              </Typography>
            </Link>
            {showCaption ? (
              <Typography
                variant="body2"
                component="span"
                dangerouslySetInnerHTML={{ __html: caption }}
              />
            ) : (
              <div className={classes.captionWrapper}>
                <HTMLEllipsis
                  unsafeHTML={caption}
                  className={classes.caption}
                  maxLine="0"
                  ellipsis="..."
                  basedOn="letters"
                />
                <Button
                  className={classes.moreButton}
                  onClick={() => setShowCaption(true)}
                >
                  More
                </Button>
              </div>
            )}
          </div>
          <Link to={`/p/${id}`}>
            <Typography
              className={classes.commentsLink}
              variant="body2"
              component="div"
            >
              View all {comments.length} comments
            </Typography>
          </Link>
          {comments.map((comment) => (
            <div key={comment.id}>
              <Link to={`/${comment.user.username}`}>
                <Typography
                  variant="subtitle2"
                  component="span"
                  className={classes.commentUsername}
                >
                  {comment.user.username}
                </Typography>{" "}
                <Typography variant="body2" component="span">
                  {comment.content}
                </Typography>
              </Link>
            </div>
          ))}
          <Typography color="textSecondary" lassName={classes.datePosted}>
            5 DAYS AGO
          </Typography>
          <Hidden xsDown>
            <Divider />
            <Comment />
          </Hidden>
        </div>
      </article>
    </>
  );
}

function LikeButton() {
  return <>LikeButton</>;
}

function SaveButton() {
  return <>SaveButton</>;
}

function Comment() {
  return <>Comment</>;
}

export default FeedPost;
