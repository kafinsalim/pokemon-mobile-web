import React from "react";
import ReactDOM from "react-dom";
import AppLayout from "./";

describe("<AppLayout>", () => {
  it("renders AppLayout without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AppLayout />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
