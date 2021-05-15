import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AddEntryPage from "../pages/AddEntryPage";
import MyEntriesPage from "../pages/MyEntriesPage";
import Count from "../pages/Count";
export const history = createBrowserHistory();

const AppRouter = (props) => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute
            path="/"
            exact={true}
            component={LoginPage}
          ></PublicRoute>
          <PrivateRoute
            path="/dashboard"
            exact={true}
            component={DashboardPage}
          ></PrivateRoute>
          <PrivateRoute
            path="/create"
            exact={true}
            component={AddEntryPage}
          ></PrivateRoute>
          <PrivateRoute
            path="/myEntries"
            exact={true}
            component={MyEntriesPage}
          ></PrivateRoute>
          <PrivateRoute
            path="/admin/count"
            exact={true}
            component={Count}
          ></PrivateRoute>
          <Route component={NotFoundPage}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default connect()(AppRouter);
