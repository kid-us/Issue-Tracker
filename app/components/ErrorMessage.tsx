import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return <p className="text-red-400 text-xs mt-1">{children}</p>;
};

export default ErrorMessage;
