import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Comment as AntComment, Tooltip } from "antd";
import moment from "moment";
import gql from "graphql-tag";
import { AuthContext } from "../../context/auth";

const Comment = ({ postId, comment }) => {
  const { user } = useContext(AuthContext);

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { postId, commentId: comment.id },
  });

  const commentActions =
    user && user.username === comment.username
      ? [
          <Tooltip key="delete-comment" title="Delete Comment">
            <span onClick={deleteComment} style={{ color: "red" }}>
              Delete
            </span>
          </Tooltip>,
        ]
      : null;

  return (
    <AntComment
      author={comment.username}
      content={comment.body}
      datetime={moment(comment.createdAt).fromNow()}
      actions={commentActions}
    />
  );
};

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Comment;
