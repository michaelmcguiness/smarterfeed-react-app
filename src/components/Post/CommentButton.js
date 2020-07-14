import React from "react";
import { Button, Tooltip } from "antd";
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
    <Link to={`/posts/${id}`}>
      <Button
        type="text"
        icon={
          <Tooltip title="View Comments">
            <Container>
              <CommentOutlined style={{ fontSize: "18px" }} />
              {commentCount}
            </Container>
          </Tooltip>
        }
        style={{ height: "45px", width: "45px", marginLeft: "10px" }}
      />
    </Link>
  );
};

export default CommentButton;
