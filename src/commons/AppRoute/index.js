// @flow
import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Icon, ActivityIndicator } from "antd-mobile";
import { createMemoryHistory } from "history";
import AppLayout from "../AppLayout";

const Home = React.lazy(() => import("../../pages/Home"));
const Detail = React.lazy(() => import("../../pages/Detail"));
const MyPokemon = React.lazy(() => import("../../pages/MyPokemon"));

const LoadingSpinner = () => (
  <div
    style={{
      height: "100%",
      width: "100%",
      textAlign: "center",
      marginTop: "45%"
    }}
  >
    <ActivityIndicator toast text="Please Wait..." animating />
  </div>
);

export default function index(): React.Node {
  return (
    <Router history={createMemoryHistory("/")}>
      <AppLayout>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route exact path="/">
              <div
                style={{
                  width: "100%",
                  height: 42,
                  paddingTop: 12,
                  boxShadow: "1px 1px 4px #9E9E9E",
                  backgroundColor: "white",
                  textAlign: "center",
                  color: "#2eac0d",
                  fontWeight: "bold"
                }}
              >
                POKEMONPEDIA
              </div>
              <Home />
            </Route>
            <Route exact path="/detail/:id">
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
