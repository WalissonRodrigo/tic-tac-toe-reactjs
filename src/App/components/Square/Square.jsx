import React from "react";
import "./square.css";

function Square({ value, ...rest }) {
  return (
    <button
      className="square"
      onClick={rest.onClick}
    >
      {value}
    </button>
  );
}

export default Square;
