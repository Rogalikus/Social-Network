import React, { Suspense, Component } from "react";
import Preloader from "../components/Preloader/Preloader";

const withSuspense = (Component) => {
  return (props) => {
    return (
      <Suspense
        fallback={
          <div>
            <Preloader />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
};

export default withSuspense;
