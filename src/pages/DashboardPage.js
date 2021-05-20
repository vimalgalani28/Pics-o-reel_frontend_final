import React from "react";
import Header from "../components/Dashboard/Header";
import Main from "../components/Dashboard/Main";
import "../components/Dashboard/header.css";
import Video from '../components/Video/Video'

const DashboardPage = (props) => {
  return (
    <>
      <Main />
      <Header />
      <Video />
    </>
  );
};

export default DashboardPage;
