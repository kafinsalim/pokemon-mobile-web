import React from "react";
import ReactDOM from "react-dom";
import AppLayout from "./";

describe("<AppLayout>", () => {
  it("renders AppLayout without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AppLayout />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders AppLayout with content", () => {
    const {
      props: { children }
    } = <AppLayout>this is content of AppLayout</AppLayout>;
    expect(children).toEqual("this is content of AppLayout");
  });
});
