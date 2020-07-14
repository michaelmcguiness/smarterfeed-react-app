import React, { useState } from "react";
import { Form, Select, Input, Button } from "antd";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import WithLoading from "../components/util/WithLoading";
import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const NewPost = (props) => {
  const [errors, setErrors] = useState({});
  const initialState = { title: "", url: "", tag: "FINANCE" };

  const { onFinish, formData } = useForm(createPostCallback, initialState);

  const [createPost, { error, loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: formData,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const cachedPosts = data.getPosts || [];
      data.getPosts = [result.data.createPost, ...cachedPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      formData.title = "";
      formData.url = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <WithLoading loading={loading}>
      <div className="form-container">
        <Form onFinish={onFinish} initialValues={{ tag: initialState.tag }}>
          <h1>Add a New Post</h1>
          <Form.Item
            label="Url"
            name="url"
            rules={[{ required: true, message: "Link to article is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Give your post a catchy title!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tag"
            label="Tag"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select the category that fits best",
              },
            ]}
          >
            <Select>
              <Select.Option value="FINANCE">Finance</Select.Option>
              <Select.Option value="TECHNOLOGY">Technology</Select.Option>
              <Select.Option value="NEWS">News</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </WithLoading>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($url: String!, $title: String!, $tag: String!) {
    createPost(url: $url, title: $title, tag: $tag) {
      id
      title
      url
      tag
      score
      createdAt
      username
      upvotes {
        id
        username
        createdAt
      }
      upvoteCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default NewPost;
