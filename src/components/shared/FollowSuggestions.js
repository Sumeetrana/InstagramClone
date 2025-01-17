import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import { LoadingLargeIcon } from "../../icons";
import { useFollowSuggestionsStyles } from "../../styles";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { getDefaultUser } from "../../data";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import { UserContext } from "../../App";
import { useQuery } from "@apollo/react-hooks";
import { SUGGEST_USERS } from "../../graphql/queries";

function FollowSuggestions({ hideHeader }) {
  const classes = useFollowSuggestionsStyles();
  const { followerIds, followingIds } = React.useContext(UserContext);
  const variables = {
    limit: 20,
    followerIds,
    followingIds,
    createdAt: "2021-01-07T04:24:45.208517+00:00",
    // createdAt: me.created_at,
  };

  const { data, loading } = useQuery(SUGGEST_USERS, { variables });

  return (
    <div className={classes.container}>
      {!hideHeader && (
        <Typography
          color="textSecondary"
          variant="subtitle2"
          className={classes.typography}
        >
          Suggestions for you
        </Typography>
      )}
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <Slick
          className={classes.slide}
          dots={false}
          infinite={true}
          speed={1000}
          touchThresold={500}
          variableWidth
          swipeToSlide
          arrows
          slidesToScroll={2}
          slidesToShow={2}
          easing="ease-in-out"
        >
          {data.users.map((user) => (
            <FollowSuggestionsItem key={user.id} user={user} />
          ))}
        </Slick>
      )}
    </div>
  );
}

function FollowSuggestionsItem({ user }) {
  const classes = useFollowSuggestionsStyles();
  const { profile_image, username, name, id } = user;

  return (
    <div>
      <div className={classes.card}>
        <Link to={`/${username}`}>
          <Avatar
            src={profile_image}
            alt={`${username}'s profile`}
            classes={{
              root: classes.avatar,
              img: classes.avatarImg,
            }}
          />
        </Link>
        <Link to={`/${username}`}>
          <Typography
            variant="subtitle2"
            className={classes.text}
            align="center"
          >
            {username}
          </Typography>
        </Link>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.text}
          align="center"
        >
          {name}
        </Typography>
        <FollowButton id={id} side={false} />
      </div>
    </div>
  );
}

export default FollowSuggestions;
