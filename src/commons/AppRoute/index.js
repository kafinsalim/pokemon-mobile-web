// @flow
import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppLayout from "../AppLayout";
import { ActivityIndicator } from "antd-mobile";

const Home = React.lazy(() => import("../../pages/Home"));
const Detail = React.lazy(() => import("../../pages/Detail"));
const MyPokemon = React.lazy(() => import("../../pages/MyPokemon"));
const ErrorScreen = React.lazy(() => import("../ErrorScreen"));

export default function index(): React.Node {
  return (
    <BrowserRouter>
      <AppLayout>
        <React.Suspense
          fallback={<ActivityIndicator toast text="Please Wait..." animating />}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/my-pokemon" component={MyPokemon} />
            <Route component={ErrorScreen} />
          </Switch>
        </React.Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}
