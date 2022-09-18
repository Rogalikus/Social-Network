import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./login.module.css";
import { connect } from "react-redux";
import { signIn } from "./../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const loginFormSchema = Yup.object({
  email: Yup.string().email("Invalid e-mail").required("Required"),
  password: Yup.string()
    .min(5, "Must be longer than 5 characters")
    .required("Required"),
});

const Login = ({ signIn, isAuth }) => {
  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div className={s.login}>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: "" }}
        validationSchema={loginFormSchema}
        onSubmit={(values) => {
          signIn(values.email, values.password, values.rememberMe);
        }}
      >
        {() => (
          <Form>
            <div>
              <Field type="email" name="email" placeholder="e-mail" />
              <ErrorMessage name="email" component="p" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="password" />
              <ErrorMessage name="password" component="p" />
            </div>
            <div>
              <Field type="checkbox" name="rememberMe" />
              <label htmlFor="rememberMe">remember me</label>
            </div>
            <button type="submit">Log in</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { signIn })(Login);

// export const Login = (props) => {
//   return (
//     <div>
//       <h1 className={styles.page}>Login</h1>
//       <LoginForm/>
//     </div>
//   );
// };

// export const LoginForm = (props) => {
//   return (
//     <form>
//       <div className={styles.login}>
//         <input placeholder={"Login "} />
//       </div>
//       <div className={styles.password}>
//         <input placeholder={"Password"} />
//       </div>
//       <div className={styles.memory}>
//         <input type={"Checkbox"} /> remember me
//       </div>
//       <div className={styles.button}>
//         <button> Login </button>
//       </div>
//     </form>
//   );
// };
