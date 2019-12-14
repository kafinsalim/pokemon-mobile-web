// @flow
import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Centered = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  margin-top: 15%;
`;

export default (): React.Node => (
  <Centered>
    <h4>Page Not Found</h4>
    <Link to="/">Go Home</Link>
  </Centered>
);
