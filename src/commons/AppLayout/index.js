// @flow
import * as React from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd-mobile";

export default function AppLayout({
  children
}: {
  children: React.Node
}): React.Node {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div>
      <div style={{ marginBottom: 54, overflow: "hidden" }}>{children}</div>
      <div
        style={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          boxShadow: "0px -2px 6px 0px rgba(0,0,0,0.1)",
          display: "flex",
          backgroundColor: "white",
          padding: 8
        }}
      >
        <Link
          to="/"
          style={{
            width: "50%",
            height: 48,
            textAlign: "center",
            color: activeTab === 0 ? "#2eac0d" : "#9F9F9F"
          }}
          onClick={() => setActiveTab(0)}
        >
          <Icon type="search" size="md" />
          <br />
          Explore
        </Link>
        <Link
          to="/my-pokemon"
          style={{
            width: "50%",
            height: 48,
            textAlign: "center",
            color: activeTab === 1 ? "#2eac0d" : "#9F9F9F"
          }}
          onClick={() => setActiveTab(1)}
        >
          <Icon type="search" size="md" />
          <br />
          My Pokemon
        </Link>
      </div>
    </div>
  );
}
