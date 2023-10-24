"use client";
import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}
const error = ({ error, reset }: Props) => {
  console.log(error);
  return (
    <>
      <div>An unexpected error has occurred</div>
      <button className="btn btn-error" onClick={() => reset()}>
        Retry
      </button>
    </>
  );
};

export default error;
