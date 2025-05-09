import React from "react";

import "./MissingContentMessage.css";

const MissingContentMessage = ({ message }) => {
  return <p className="message-text">{message}</p>;
};

export default MissingContentMessage;
