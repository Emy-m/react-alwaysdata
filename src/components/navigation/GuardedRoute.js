import React from "react";
import { Navigate } from "react-router-dom";

const GuardedRoute = ({
  component: Component,
  failNavigate,
  condition,
  ...props
}) => {
  return condition ? (
    <Component {...props} />
  ) : (
    <Navigate to={failNavigate} replace />
  );
};

export default GuardedRoute;
