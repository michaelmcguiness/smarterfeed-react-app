import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";

import { getTopDomain } from "../util/helperFunctions";
import UpvoteButton from "../components/Post/UpvoteButton";
import DeleteButton from "../components/Post/DeleteButton";
import Comment from "../components/Comment/Comment";
import CommentEditor from "../components/Comment/CommentEditor";

const SinglePost = (props) => {
  const postId = props.match.params.postId;

  const [comment, setComment] = useState("");

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
  });

  let postMarkup;
  if (!getPost) {
    postMarkup = (
      <div style={{ textAlign: "center", margin: "auto" }}>
        <Spin tip="Loading..." />
      </div>
    );
  } else {
    const {
      id,
      url,
      title,
      createdAt,
      username,
      upvoteCount,
      upvotes,
      commentCount,
      comments,
    } = getPost;

    postMarkup = (
      <div>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <UpvoteButton post={{ id, upvoteCount, upvotes }} />
          <div>
            <div style={{ marginBottom: "20px" }}>
              <h2>
                {title}{" "}
                <DeleteButton {...props} postId={id} username={username} />
              </h2>
              <h3>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {getTopDomain(url)}
                </a>
              </h3>
              <h4>
                Posted by <Link to={`/users/${username}`}>{username}</Link>
                {` ${moment(createdAt).fromNow(true)} ago`}
              </h4>
            </div>
            <CommentEditor
              onChange={(e) => setComment(e.target.value)}
              onSubmit={submitComment}
              value={comment}
            />
            <h2>{`${commentCount} Comments`}</h2>

            {comments.map((comment, index) => (
              <Comment comment={comment} postId={id} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return postMarkup;
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      url
      title
      createdAt
      username
      upvoteCount
      upvotes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
