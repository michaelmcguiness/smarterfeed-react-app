import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useForm } from "../util/hooks";
import WithLoading from "../util/WithLoading";

function Login(props) {
  const [errors, setErrors] = useState({});
  const initialState = { username: "password", password: "password" };

  const { onFinish, formData } = useForm(loginCallback, initialState);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result);
      props.history.push("/");
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: formData,
  });

  function loginCallback() {
    loginUser();
  }

  return (
    <WithLoading loading={loading}>
      <div className="form-container">
        <Form className="login-form" onFinish={onFinish}>
          <h1>Log In</h1>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {Object.keys(errors).length > 0 && (
          <Alert
            type="error"
            message={
              <ul style={{ marginBottom: 0 }}>
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            }
          />
        )}
      </div>
    </WithLoading>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      createdAt
      token
    }
  }
`;

export default Login;
