import React from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import FeedPage from "./pages/feed";
import ProfilePage from "./pages/profile";
import PostPage from "./pages/post";
import ExplorePage from "./pages/explore";
import EditProfilePage from "./pages/edit-profile";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import NotFoundPage from "./pages/not-found";
import PostModal from "./components/post/PostModal";
import { AuthContext } from "./auth";
import { useSubscription } from "@apollo/react-hooks";
import { ME } from "./graphql/subscriptions";
import LoadingScreen from "./components/shared/LoadingScreen";

export const UserContext = React.createContext();

function App() {
  const { authState } = React.useContext(AuthContext);
  const isAuth = authState.status === "in";
  const userId = isAuth ? authState.user.uid : null;
  const variables = { userId };
  const { data, loading } = useSubscription(ME, { variables });
  const history = useHistory();
  const location = useLocation();
  const prevLocation = React.useRef(location);
  const modal = location.state?.modal;

  React.useEffect(() => {
    if (history.action !== "POP" && !modal) {
      prevLocation.current = location;
    }
  }, [location, modal, history.action]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuth) {
    return (
      <Switch>
        <Route path="/accounts/login" component={LoginPage} />
        <Route path="/accounts/emailsignup" component={SignupPage} />
        <Redirect to="/accounts/login" />
      </Switch>
    );
  }

  const isModalOpen = modal && prevLocation.current !== location;
  const me = isAuth && data ? data.users[0] : null;
  const currentUserId = me.id;
  const followingIds = me.following.map(({ user }) => user.id);
  const followerIds = me.followers.map(({ user }) => user.id);
  const feedIds = [...followingIds, currentUserId];

  return (
    <UserContext.Provider
      value={{ me, currentUserId, followerIds, followingIds, feedIds }}
    >
      <Switch location={isModalOpen ? prevLocation.current : location}>
        <Route exact path="/" component={FeedPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route exact path="/:username" component={ProfilePage} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route path="/accounts/login" component={LoginPage} />
        <Route path="/accounts/emailsignup" component={SignupPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path="/p/:pathId" component={PostModal} />}
    </UserContext.Provider>
  );
}

export default App;
