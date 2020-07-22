import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import gql from "graphql-tag";
import { AuthContext } from "../../context/auth";
import { FETCH_POSTS_QUERY } from "../../util/graphql";

const DeleteButton = ({ postId, username, ...props }) => {
  const { user } = useContext(AuthContext);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      const cachedPosts = data.getPosts || [];
      data.getPosts = cachedPosts.filter((p) => p.id !== postId);
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      props.history.push("/");
    },
    variables: {
      postId,
    },
  });

  const deleteButton =
    user && user.username === username ? (
      <Popconfirm
        title="Are you sure delete this post?"
        onConfirm={deletePost}
        okText="Yes"
        cancelText="No"
      >
        <Tooltip title="Delete Post">
          <Button
            type="text"
            icon={<DeleteOutlined style={{ fontSize: "18px" }} />}
            danger
          />
        </Tooltip>
      </Popconfirm>
    ) : null;

  return deleteButton;
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
