import * as React from "react";
import { Link } from "react-router-dom";

export default function index(): React.Node {
  return (
    <div>
      Home
      <br />
      <Link to={`/detail/1/satu`}>lihat pokemon</Link>
    </div>
  );
}
