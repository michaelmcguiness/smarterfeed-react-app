import React from "react";
import LogoImage from "../../assets/logo.svg";

const Logo = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}>
      <img
        width="30px"
        height="30px"
        src={LogoImage}
        style={{ marginRight: "5px" }}
        alt="smarterfeed logo"
      />
      <h3 style={{ margin: 0 }}>SmarterFeed.io</h3>
    </div>
  );
};

export default Logo;
