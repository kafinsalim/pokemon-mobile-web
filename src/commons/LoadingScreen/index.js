// @flow
import * as React from "react";
import styled from "styled-components";
import { ActivityIndicator } from "antd-mobile";

const Centered = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  margin-top: 45%;
`;

export default (): React.Node => (
  <Centered>
    <ActivityIndicator toast text="Please Wait..." animating />
  </Centered>
);
