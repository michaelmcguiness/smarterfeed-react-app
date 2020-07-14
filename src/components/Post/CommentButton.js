import React from "react";
import { Button } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentButton = ({ post: { commentCount, id } }) => {
  return (
    <Link to={`/post/${id}`}>
      <Button
        type="text"
        icon={
          <Container>
            <CommentOutlined style={{ fontSize: "18px" }} />
            {commentCount}
          </Container>
        }
        style={{ height: "45px", width: "45px", marginLeft: "10px" }}
      />
    </Link>
  );
};

export default CommentButton;
