import React from "react";

const Progress_bar = ({ progress, height }) => {
  const Parentdiv = {
    height: height,
    width: "100%",
    marginTop: "4px",
    backgroundColor: "#F7F5F9",
    borderRadius: "0.5rem",
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    background: "#8064A2",
    borderRadius: "0.5rem",
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv} />
    </div>
  );
};

export default Progress_bar;
