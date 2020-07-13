import React, { useContext } from "react";
import { Button, Space } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

const MyMenu = (props) => {
  const { user, logout } = useContext(AuthContext);

  const menu = user ? (
    <Space>
      <Link to="/submit">
        <Button type="text">Submit</Button>
      </Link>
      <Button type="text" onClick={logout}>
        Log Out
      </Button>
    </Space>
  ) : (
    <Space>
      <Link to="/login">
        <Button size="middle">Log In</Button>
      </Link>
      <Link to="/signup">
        <Button type="primary" size="middle">
          Sign Up
        </Button>
      </Link>
    </Space>
  );

  return <Container>{menu}</Container>;
};

export default MyMenu;
