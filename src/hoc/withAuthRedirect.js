import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

export const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Navigate to="/login" />;
      return <Component {...this.props} />;
    }
  }
  const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
  });
  let ConnectedAuthRedirectComp = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );
  return ConnectedAuthRedirectComp;
};
