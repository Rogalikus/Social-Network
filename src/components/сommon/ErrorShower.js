import React from "react";

export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return <div>{hasError && <div>{meta.error}</div>}</div>;
};
