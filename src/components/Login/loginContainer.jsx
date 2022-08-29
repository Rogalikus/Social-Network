import { auThorize } from "../../redux/auth-reducer";

let mapDispatchToProps = (dispatch) => {
  return {
    logIn: (email, password, rememberMe) => {
      dispatch(auThorize(email, password, rememberMe));
    },
  };
};

export default connect(mapDispatchToProps)(login);
