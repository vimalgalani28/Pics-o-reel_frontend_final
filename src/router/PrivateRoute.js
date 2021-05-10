import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../components/List/List";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? (
        <div>
          <Navbar />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.user.displayName,
});

export default connect(mapStateToProps)(PrivateRoute);
