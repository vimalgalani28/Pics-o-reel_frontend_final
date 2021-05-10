import React, { useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import axios from "axios";
import { loginUser } from "./actions/user";
import { connect } from "react-redux";
import { setMyEntries } from "./actions/myEntry";
import { XlviLoader } from "react-awesome-loaders";

const App = (props) => {
  const [hasLoadedUser, setHasLoadedUser] = useState(false);
  useEffect(() => {
    const fetchUser = async (token) => {
      const options = {
        method: "GET",
        url: "http://localhost:5000/user",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios(options);
        if (!res.data.error) {
          const user = res.data.user;
          props.dispatch(loginUser(user));
          const newOptions = {
            method: "GET",
            url: "http://localhost:5000/entry",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const res2 = await axios(newOptions);
          if (!res2.data.error) {
            props.dispatch(setMyEntries(res2.data));
          }
        }
      } catch (e) {
        console.log(e);
      }
      setHasLoadedUser(true);
    };

    const token = JSON.parse(localStorage.getItem("picsjwt"));
    if (token) {
      fetchUser(token);
    } else {
      setHasLoadedUser(true);
    }
  }, [props]);

  return hasLoadedUser ? (
    <AppRouter />
  ) : (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <XlviLoader boxColors={["#EF4444", "#F59E0B", "#6366F1"]} />
    </div>
  );
};

export default connect()(App);
