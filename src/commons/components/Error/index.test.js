import React from "react";
import ReactDOM from "react-dom";
import Error from "./";

describe("<Error>", () => {
  it("renders Error without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Error />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Error with description", () => {
    const {
      props: { children }
    } = <Error>this is description of Error</Error>;
    expect(children).toEqual("this is description of Error");
  });
});
