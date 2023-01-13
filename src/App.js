import routes from "./components/Router/Router";
import Navbar from "./components/Navbar/Navbar";
import { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

const AuthRoute = ({ component: Component, title, ...rest }) => {
  const token = localStorage.getItem("isLoggedIn");

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <>
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          </>
        )
      }
    />
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar>
          <Switch>
            {routes.map((route) =>
              route.authRequired ? (
                <AuthRoute
                  key={route.path}
                  exact={route.exact}
                  path={route.path}
                  title={route.title}
                  component={route.component}
                />
              ) : (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={route.path}
                  title={route.title}
                  component={route.component}
                />
              )
            )}
          </Switch>
        </Navbar>
      </Router>
    );
  }
}

export default withRouter(App);
