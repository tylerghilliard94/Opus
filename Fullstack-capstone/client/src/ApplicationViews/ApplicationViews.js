import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../Login/Login";
import Register from "../Login/Register";
import Hello from "../Hello";
import Explore from "../Explore/Explore";


export default function ApplicationViews(props) {
  const { isLoggedIn, activeUser, userTypeId } = useContext(UserProfileContext);
  const [refresh, setRefresh] = useState(false);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>
        <Route path="/explore" exact>
          {isLoggedIn ? <Explore /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>


      </Switch>
    </main >
  );
};
