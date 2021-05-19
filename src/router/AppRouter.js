import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
// import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
// import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// import AllEntries from "../voting/AllEntries";
// import Wishlist from "../voting/Wishlist";
// import AdminPage from "../pages/AdminPage";
// import AddEntryPage from "../pages/AddEntryPage";
// import MyEntriesPage from "../pages/MyEntriesPage";

export const history = createBrowserHistory();

const AppRouter = (props) => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute
            path="/"
            exact={true}
            component={DashboardPage}
          ></PublicRoute>
          {/*   <PrivateRoute
            path="/dashboard"
            exact={true}
            component={DashboardPage}
          ></PrivateRoute>
            <PrivateRoute
            path="/myEntries"
            exact={true}
            component={MyEntriesPage}
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
          ></PrivateRoute>
          <PrivateRoute
            path="/admin/leaderboard"
            exact={true}
            component={AdminPage}
         ></PrivateRoute>*/}
          <Route component={NotFoundPage}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default connect()(AppRouter);
