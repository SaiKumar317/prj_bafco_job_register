import React from "react";
import { ThreeDots } from "react-loader-spinner"; // make sure this package is installed
// import "./LoadingView.css"; // optional: for custom styles

const LoadingView = () => {
  return (
    <div
      className="products-loader-container"
      tabIndex="0"
      onKeyDown={(e) => e.preventDefault()}
      onKeyUp={(e) => e.preventDefault()}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ThreeDots type="ThreeDots" color="#44799b" height="50" width="50" />
        <p
          style={{
            // lightgray color
            color: "#868e96",
            fontSize: "16px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Please wait...
        </p>
      </div>
      {/* <p className="products-loader-text">Loading...</p> */}
    </div>
  );
};

export default LoadingView;
