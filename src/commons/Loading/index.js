// @flow
import * as React from "react";
import { Spin } from "antd";

export default function Loading(): React.Node {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Spin tip="Loading..." />
    </div>
  );
}
