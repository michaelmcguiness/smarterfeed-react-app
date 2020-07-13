import React, { useContext, useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import WithLoading from "../util/WithLoading";

function Signup(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const initialState = { username: "", email: "", password: "" };

  const { onFinish, formData } = useForm(registerCallback, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: formData,
  });

  // need to hoist addUser for useForm hook
  function registerCallback() {
    addUser();
  }

  return (
    <WithLoading loading={loading}>
      <div className="form-container">
        <Form className="login-form" onFinish={onFinish}>
          <h1>Sign Up</h1>
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
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
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

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(
      registerInput: { username: $username, email: $email, password: $password }
    ) {
      id
      username
      createdAt
      token
    }
  }
`;

export default Signup;
