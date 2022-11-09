import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./login.module.css";
import { signIn } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const loginFormSchema = Yup.object({
  email: Yup.string().email("Invalid e-mail").required("Required"),
  password: Yup.string()
    .min(5, "Must be longer than 5 characters")
    .required("Required"),
});

interface FormValue {
  email: string;
  password: string;
  rememberMe: boolean;
  captchaURL: null;
}

export const Login: React.FC = () => {
  const captchaURL = useSelector(
    (state: AppStateType) => state.auth.captchaURL
  );
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const dispatch = useDispatch();
  //const logIn = (email:string,password:string,rememberMe:boolean, captchaURL:null ) => dispatch(signIn(email,password,rememberMe,captchaURL))
  const onSubmit = (values: FormValue) => {
    dispatch(
      signIn(
        values.email,
        values.password,
        values.rememberMe,
        values.captchaURL
      )
    );
  };
  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }

  const initialValues: FormValue = {
    email: "",
    password: "",
    rememberMe: true || false,
    captchaURL: null,
  };
  return (
    <div className={s.login}>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginFormSchema}
        onSubmit={onSubmit}
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
            <div>{captchaURL && <img src={captchaURL} />}</div>
            <div>
              {captchaURL && (
                <Field type="input" name="captchaURL" placeholder="Captcha" />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

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
