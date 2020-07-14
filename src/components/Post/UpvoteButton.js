import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Tooltip } from "antd";
import { UpOutlined } from "@ant-design/icons";
import styled from "styled-components";
import gql from "graphql-tag";
import { AuthContext } from "../../context/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpvoteButton = ({ post: { id, upvoteCount, upvotes } }) => {
  const { user } = useContext(AuthContext);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && upvotes.find((upvote) => upvote.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, upvotes]);

  const [upvotePost] = useMutation(UPVOTE_POST_MUTATION, {
    variables: { postId: id },
  });

  const upvoteButton = user ? (
    <Button
      onClick={upvotePost}
      type={user && liked ? "link" : "text"}
      icon={
        <Tooltip title="Upvote Post">
          <Container>
            <UpOutlined />
            {upvoteCount}
          </Container>
        </Tooltip>
      }
      style={{ height: "45px", width: "45px", marginRight: "10px" }}
    />
  ) : (
    <Link to="/login">
      <Button
        type="text"
        icon={
          <Container>
            <UpOutlined />
            {upvoteCount}
          </Container>
        }
        style={{ height: "45px", width: "45px", marginRight: "10px" }}
      />
    </Link>
  );

  return upvoteButton;
};

const UPVOTE_POST_MUTATION = gql`
  mutation upvotePost($postId: ID!) {
    upvotePost(postId: $postId) {
      id
      upvotes {
        id
        username
      }
      upvoteCount
    }
  }
`;

export default UpvoteButton;
