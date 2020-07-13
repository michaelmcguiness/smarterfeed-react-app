import React from "react";
import { Spin } from "antd";

const WithLoading = ({ loading, children }) => {
  const markup = loading ? (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <Spin tip="Loading..." />
    </div>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );

  return markup;
};

export default WithLoading;
