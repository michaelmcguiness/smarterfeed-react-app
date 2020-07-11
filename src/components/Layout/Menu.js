import React from "react";
import { Button, Space } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

const MyMenu = (props) => {
  const size = "middle";
  return (
    <Container>
      <Space>
        <Link to="/login">
          <Button size={size}>Log In</Button>
        </Link>
        <Link to="/signup">
          <Button type="primary" size={size}>
            Sign Up
          </Button>
        </Link>
      </Space>
    </Container>
  );
};

export default MyMenu;
