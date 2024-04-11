import React from "react";
import { Alert } from "flowbite-react";

const AlertComponent = ({ color, icon, title, description }) => {
  return (
    <Alert
      color={color}
      icon={icon}
      className="left-1/2 z-50 fixed flex max-w-[500px] -translate-x-1/2 transform"
    >
      <span className="font-medium">{title}</span> {description}
    </Alert>
  );
};

export default AlertComponent;
