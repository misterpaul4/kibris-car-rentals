import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
    component: Component,
    authToken: auth,
    ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      auth.loggedIn ? (
        <Component auth={auth} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

const mapStateToProps = state => ({
  authToken: state.auth
});

export default connect(mapStateToProps, null)(PrivateRoute);
