import React from "react";
import { Button } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const handleClick = () => {
  console.log("take to comments");
};

const CommentButton = ({ commentCount }) => {
  return (
    <Button
      type="text"
      onClick={handleClick}
      icon={
        <Container>
          <CommentOutlined style={{ fontSize: "18px" }} />
          {commentCount}
        </Container>
      }
      style={{ height: "45px", width: "45px", marginLeft: "10px" }}
    />
  );
};

export default CommentButton;
