// @flow
import * as React from "react";
import { StoreProvider, createStore } from "easy-peasy";
import AppRoute from "./commons/AppRoute";
import model from "./model";
import "antd/dist/antd.css";
import "antd-mobile/dist/antd-mobile.css";

const store = createStore(model);

export default function App(): React.Node {
  return (
    <StoreProvider store={store}>
      <AppRoute />
    </StoreProvider>
  );
}
