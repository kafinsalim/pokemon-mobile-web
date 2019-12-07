import React from "react";
import ReactDOM from "react-dom";
import MyPokemon from "./";

it("renders MyPokemon without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MyPokemon />, div);
  ReactDOM.unmountComponentAtNode(div);
});
