// @flow
import * as React from "react";
import { Link } from "react-router-dom";
import { Layout, Drawer, Icon, Row, Col } from "antd";

export default function AppLayout({
  children
}: {
  children: React.Node
}): React.Node {
  const [drawerVisibility, setDrawerVisibility] = React.useState(false);
  const { Header, Content } = Layout;

  const showDrawer = (): Function => {
    setDrawerVisibility(true);
  };

  const closeDrawer = (): Function => {
    setDrawerVisibility(false);
  };

  return (
    <div>
      <Layout>
        <Header
          style={{
            height: 64,
            width: "100%",
            paddingLeft: "8%",
            paddingRight: "8%",
            boxShadow: "1px 1px 4px #9E9E9E",
            backgroundColor: "white"
          }}
        >
          <Row>
            <Col span={2} style={{ textAlign: "center" }} onClick={showDrawer}>
              <Icon type="menu" />
            </Col>
            <Col span={22}>
              <p style={{ width: "100%", textAlign: "center" }}>POKEMONPEDIA</p>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            width: "100%",
            margin: "auto",
            padding: 32,
            height: 600
          }}
        >
          {children}
        </Content>
      </Layout>
      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={closeDrawer}
        visible={drawerVisibility}
      >
        <Link to={"/"} onClick={closeDrawer}>
          <span role="img" aria-label="home">
            🏠
          </span>
          Home
        </Link>
        <br />
        <br />
        <Link to={"/my-pokemon"} onClick={closeDrawer}>
          <span role="img" aria-label="my-pokemon">
            🐧
          </span>
          My Pokemon
        </Link>
      </Drawer>
    </div>
  );
}
