import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logOut } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";

type MapStateToProps = {
  isAuth: boolean;
  login: null | string;
};

type PropsType = {
  isAuth: boolean;
  login: null | string;
  logOut: () => void;
};

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state: AppStateType): MapStateToProps => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { logOut })(HeaderContainer);
