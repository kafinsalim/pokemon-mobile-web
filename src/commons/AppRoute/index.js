// @flow
import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spin } from "antd";
import AppLayout from "../components/AppLayout";

const LoadingAnimation = (): React.Node => (
  <div style={{ width: "100%", textAlign: "center" }}>
    <Spin tip="Loading..." />
  </div>
);
const Home = React.lazy(() => import("../../pages/Home"));
const Detail = React.lazy(() => import("../../pages/Detail"));
const MyPokemon = React.lazy(() => import("../../pages/MyPokemon"));

export default function index(): React.Node {
  return (
    <Router>
      <AppLayout>
        <React.Suspense fallback={<LoadingAnimation />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/detail/:id/:name">
              <Detail />
            </Route>
            <Route exact path="/my-pokemon">
              <MyPokemon />
            </Route>
          </Switch>
        </React.Suspense>
      </AppLayout>
    </Router>
  );
}
