import React from "react";
import { Spin } from "antd";
import PropTypes from "prop-types";

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

WithLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default WithLoading;
