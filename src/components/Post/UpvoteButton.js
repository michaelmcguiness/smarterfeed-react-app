import React from "react";
import { Button } from "antd";
import { UpOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const handleClick = () => {
  console.log("upvote post");
};

const UpvoteButton = ({ upvoteCount }) => {
  return (
    <Button
      type="text"
      onClick={handleClick}
      icon={
        <Container>
          <UpOutlined />
          {upvoteCount}
        </Container>
      }
      style={{ height: "45px", width: "45px", marginRight: "10px" }}
    />
  );
};

export default UpvoteButton;