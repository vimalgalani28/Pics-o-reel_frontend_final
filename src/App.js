import React, { useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import axios from "axios";
import { loginUser } from "./actions/user";
import { connect } from "react-redux";
import { XlviLoader } from "react-awesome-loaders";
import { setAllEntries } from "./actions/allEntry";

const App = (props) => {
  const [hasLoadedUser, setHasLoadedUser] = useState(false);
  useEffect(() => {
    const fetchUser = async (token) => {
      const options = {
        method: "GET",
        url: "https://picsoreel-api-voting.herokuapp.com/user",
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
          const allEntriesAPI = {
            method: "GET",
            url: "https://picsoreel-api-voting.herokuapp.com/entries/allentries",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          const res2 = await axios(allEntriesAPI);
          console.log(res2.data);
          // setAllSubEntries(res.data);

          const shuffleEntries = (array) => {
            var currentIndex = array.length,
              temporaryValue,
              randomIndex;
            while (0 !== currentIndex) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
            return array;
          };
          const shuffledEntries = shuffleEntries(res2.data);

          if (!res2.data.error) {
            props.dispatch(setAllEntries(shuffledEntries));
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
