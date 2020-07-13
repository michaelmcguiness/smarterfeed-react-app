import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import PrivateRoute from "./util/PrivateRoute";
import Layout from "./components/Layout/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Submit from "./pages/Submit";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/submit" component={Submit} />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
