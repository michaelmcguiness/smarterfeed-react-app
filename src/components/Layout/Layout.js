import React from "react";
import styled from "styled-components";
import Menu from "./Menu";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 650px;
  margin: auto;
  margin-top: 20px;
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
          <Logo />
        </Link>
        <Menu />
      </Navbar>
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
