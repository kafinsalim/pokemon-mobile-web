// @flow
import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon } from "antd-mobile";
import styled, { css } from "styled-components";

const Content = styled.div`
  margin-bottom: 54px;
  overflow: hidden;
`;

const TabContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0px;
  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  background-color: white;
  padding: 8px;
  z-index: 100;
`;

const TabItem = styled(Link)`
  width: 50%;
  height: 48px;
  text-align: center;
  color: #9f9f9f;
  ${props =>
    props.active &&
    css`
      color: #2eac0d;
    `}
`;

function AppLayout(props: Object): React.Node {
  const [activeTab, setActiveTab] = React.useState(0);

  // handle if path my-pokemon accessed manually
  const isMyPokemon = props.location.pathname === "/my-pokemon" ? 1 : 0;
  if (isMyPokemon && activeTab === 0) setActiveTab(1);

  return (
    <>
      <Content>{props.children}</Content>
      <TabContainer>
        <TabItem
          to="/"
          active={activeTab === 0 ? 1 : 0}
          onClick={() => setActiveTab(0)}
        >
          <Icon type="search" size="md" />
          <br />
          Explore
        </TabItem>
        <TabItem
          to="/my-pokemon"
          active={activeTab === 1 ? 1 : 0}
          onClick={() => setActiveTab(1)}
        >
          <Icon type="check-circle-o" size="md" />
          <br />
          My Pokemon
        </TabItem>
      </TabContainer>
    </>
  );
}

export default withRouter(AppLayout);
