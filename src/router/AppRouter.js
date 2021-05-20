import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
// import DashboardPage from "../pages/DashboardPage";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// import AllEntries from "../voting/AllEntries";
// import Wishlist from "../voting/Wishlist";
import AdminPage from "../pages/AdminPage";

export const history = createBrowserHistory();

const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <PublicRoute
            path="/"
            exact={true}
            component={LoginPage}
          ></PublicRoute>
          {/* <PrivateRoute
            path="/dashboard"
            exact={true}
            component={DashboardPage}
          ></PrivateRoute>
          <PrivateRoute
            path="/wishlist"
            exact={true}
            component={Wishlist}
          ></PrivateRoute>
          <PrivateRoute
            path="/entries"
            exact={true}
            component={AllEntries}
          ></PrivateRoute> */}
          <PrivateRoute
            path="/admin/leaderboard"
            exact={true}
            component={AdminPage}
          ></PrivateRoute>
          <Route component={NotFoundPage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default connect()(AppRouter);
