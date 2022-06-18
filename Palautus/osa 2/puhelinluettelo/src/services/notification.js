import React from "react";

const Notification = ({ message, type }) => {
    console.log(message, type)
  if (message === "undefined" || message === null) {
    return null;
  }

  if (type === "error") {
    return <div className="error">{message}</div>;
  } else {
    return <div className="success">{message}</div>;
  }
};

export default Notification;
