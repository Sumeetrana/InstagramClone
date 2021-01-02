import React from "react";
import { useProfilePageStyles } from "../styles";
import Layout from "../components/shared/Layout";
import { defaultCurrentUser } from "../data";
import {
  Button,
  ButtonBase,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Hidden,
  Typography,
  Zoom,
} from "@material-ui/core";
import ProfilePicture from "../components/shared/ProfilePicture";
import { GearIcon } from "../icons";
import { Link } from "react-router-dom";

function ProfilePage() {
  const isOwner = false;
  const classes = useProfilePageStyles();
  const [showOptionMenu, setOptionsMenu] = React.useState(false);

  function handleOptionsMenuClick() {
    setOptionsMenu(true);
  }

  function handleCloseMenu() {
    setOptionsMenu(false);
  }

  return (
    <Layout
      title={`${defaultCurrentUser.name} (@${defaultCurrentUser.username})`}
    >
      <div className={classes.container}>
        <Hidden xsDown>
          <Card className={classes.cardLarge}>
            <ProfilePicture isOwner={isOwner} />
            <CardContent className={classes.cardContentLarge}>
              <ProfileNameSection
                handleOptionsMenuClick={handleOptionsMenuClick}
                user={defaultCurrentUser}
                isOwner={isOwner}
              />
              <PostCountSection />
              <NameBioSection />
            </CardContent>
          </Card>
        </Hidden>
        <Hidden smUp>
          <Card className={classes.cardSmall}>
            <CardContent>
              <section className={classes.sectionSmall}>
                <ProfilePicture size={77} isOwner={isOwner} />
                <ProfileNameSection
                  user={defaultCurrentUser}
                  isOwner={isOwner}
                  handleOptionsMenuClick={handleOptionsMenuClick}
                />
              </section>
              <NameBioSection />
            </CardContent>
            <PostCountSection />
          </Card>
        </Hidden>
        {showOptionMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
      </div>
    </Layout>
  );
}

function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
  const classes = useProfilePageStyles();

  let followButton;
  const isFollowing = true;
  const isFollower = false;
  if (isFollowing) {
    followButton = (
      <Button variant="outlined" className={classes.button}>
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        Follow
      </Button>
    );
  }
  return (
    <>
      <Hidden xsDown>
        <section className={classes.usernameSection}>
          <Typography className={classes.username}>{user.username}</Typography>
          {isOwner ? (
            <>
              <Link to="/accounts/edit">
                <Button variant="outlined">Edit Profile</Button>
              </Link>
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon className={classes.settings} />
              </div>
            </>
          ) : (
            <>{followButton}</>
          )}
        </section>
      </Hidden>
      <Hidden smUp>
        <section>
          <div className={classes.usernameDivSmall}>
            <Typography className={classes.username}>
              {user.username}
            </Typography>
            {isOwner && (
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon className={classes.settings} />
              </div>
            )}
          </div>
          {isOwner ? (
            <Link to="/accounts/edit">
              <Button variant="outlined" style={{ width: "100%" }}>
                Edit Profile
              </Button>
            </Link>
          ) : (
            followButton
          )}
        </section>
      </Hidden>
    </>
  );
}

function PostCountSection() {
  return <>PostCountSection</>;
}

function NameBioSection() {
  return <>NameBioSection</>;
}

function OptionsMenu({ handleCloseMenu }) {
  const classes = useProfilePageStyles();
  const [showLogoutMessage, setLogoutMessage] = React.useState(false);

  function handleLogoutClick() {
    setLogoutMessage(true);
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.dialogPaper,
      }}
      TransitionComponent={Zoom}
    >
      {showLogoutMessage ? (
        <DialogTitle className={classes.dialogTitle}>
          Logging Out
          <Typography color="textSecondary">
            You need to log back in to continue using Instagram.
          </Typography>
        </DialogTitle>
      ) : (
        <>
          <OptionsItem text="Change Password" />
          <OptionsItem text="Name" />
          <OptionsItem text="Authorized Apps" />
          <OptionsItem text="Notifications" />
          <OptionsItem text="Privacy and Security" />
          <OptionsItem text="Log Out" onClick={handleLogoutClick} />
          <OptionsItem text="Cancel" onClick={handleCloseMenu} />
        </>
      )}
    </Dialog>
  );
}

function OptionsItem({ text, onClick }) {
  return (
    <>
      <Button style={{ padding: "12px 8px" }} onClick={onClick}>
        {text}
      </Button>
    </>
  );
}

export default ProfilePage;
