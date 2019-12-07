import React from "react";
import { Link } from "react-router-dom";

export default function index() {
  const { id, name } = [1, "agus"]; // useParams();

  return (
    <div>
      Detail id:{id} name:{name}
      <br />
      <Link to={"/"}>Back to Home</Link>
    </div>
  );
}
