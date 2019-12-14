// @flow
import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../utils/history";
import AppLayout from "../AppLayout";
import LoadingScreen from "../LoadingScreen";

const Home = React.lazy(() => import("../../pages/Home"));
const Detail = React.lazy(() => import("../../pages/Detail"));
const MyPokemon = React.lazy(() => import("../../pages/MyPokemon"));
const ErrorScreen = React.lazy(() => import("../ErrorScreen"));

export default function index(): React.Node {
  return (
    <Router history={history}>
      <AppLayout>
        <React.Suspense fallback={<LoadingScreen />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/my-pokemon" component={MyPokemon} />
            <Route component={ErrorScreen} />
          </Switch>
        </React.Suspense>
      </AppLayout>
    </Router>
  );
}
