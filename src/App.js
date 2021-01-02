import React from "react";
import { Route, Switch } from "react-router-dom";
import FeedPage from "./pages/feed";
import ProfilePage from "./pages/profile";
import PostPage from "./pages/post";
import ExplorePage from "./pages/explore";
import EditProfilePage from "./pages/edit-profile";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import NotFoundPage from "./pages/not-found";
import PostModal from "./components/post/PostModal";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={FeedPage} />
      <Route path="/explore" component={ExplorePage} />
      <Route exact path="/:username" component={ProfilePage} />
      <Route exact path="/p/:postId" component={PostPage} />
      <Route path="/accounts/edit" component={EditProfilePage} />
      <Route path="/accounts/login" component={LoginPage} />
      <Route path="/accounts/emailsignup" component={SignupPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;
