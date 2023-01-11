import Login from "../accounts/login/Login";
import SignUp from "../accounts/signUp/SignUp";
import Dashboard from "../Dashboard/Dashboard";
import Home from "../Home/Home";
import NewPost from "../NewPost/NewPost";
import Setting from "../Setting/Setting";
class Route {
  constructor({ path, component, title, exact = true, authRequired = true }) {
    this.path = path;
    this.component = component;
    this.title = title;
    this.exact = exact;
    this.authRequired = authRequired;
  }
}
const routes = [
  new Route({
    path: "/",
    title: "Home",
    component: Home,
    authRequired: false,
  }),
  new Route({
    path: "/login",
    title: "Login",
    component: Login,
    authRequired: false,
  }),
  new Route({
    path: "/sign-up",
    title: "Sign Up",
    component: SignUp,
    authRequired: false,
  }),
  new Route({
    path: "/dashboard",
    title: "dashboard",
    component: Dashboard,
  }),
  new Route({
    path: "/new-post",
    title: "new-post",
    component: NewPost,
  }),
  new Route({
    path: "/setting",
    title: "setting",
    component: Setting,
  }),
];

export default routes;
