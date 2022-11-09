import React, { Suspense } from "react";
import Preloader from "../components/Preloader/Preloader";

const withSuspense = <WCP extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<WCP>
) => {
  return (props: any) => {
    return (
      <Suspense
        fallback={
          <div>
            <Preloader />
          </div>
        }
      >
        <WrappedComponent {...(props as WCP)} />
      </Suspense>
    );
  };
};

export default withSuspense;
