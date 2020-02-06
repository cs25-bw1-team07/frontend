import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/header/Header";


const ProtectedNav = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        } else {
          return <Header />;
        }
      }}
    />
  );
};

export default ProtectedNav;