import React from "react";
import styled from "styled-components";
import Menu from "./Menu";
import { PageHeader } from "antd";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 650px;
  margin: auto;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  padding: 24px;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Navbar>
        <Link to="/">
          <PageHeader title="SmarterFeed.io" />
        </Link>
        <Menu />
      </Navbar>
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
