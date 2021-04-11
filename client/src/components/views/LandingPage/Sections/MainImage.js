import React from "react";

function MainImage(props) {
  return (
    <div
      style={{
        background: `url('${props.image}') no-repeat top center`,
        height: "500px",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            left: "15%",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem",
            padding: "1rem",
          }}
        >
          <h2 style={{ color: "white" }}> {props.title} </h2>
          <p style={{ color: "white", fontSize: "1rem" }}> {props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
