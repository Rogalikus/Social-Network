import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";

export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<WCP>
) {
  function RedirectComponent(props: MapStateToPropsType) {
    let { isAuth, ...restProps } = props;
    if (!isAuth) return <Navigate to="/login" />;
    return <WrappedComponent {...(restProps as WCP)} />;
  }
  const mapStateToPropsForRedirect = (
    state: AppStateType
  ): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
  });
  type MapStateToPropsType = {
    isAuth: boolean;
  };
  let ConnectedAuthRedirectComp = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );
  return ConnectedAuthRedirectComp;
}
