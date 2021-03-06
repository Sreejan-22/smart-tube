import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Videos from "./components/Videos/Videos";

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/videos/:id" component={Videos} />
        <Route exact path="/videos">
          <Redirect to="/" />
        </Route>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}
