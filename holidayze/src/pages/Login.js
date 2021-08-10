import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL, AUTH_PATH } from "../utils/constants";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

const Login = () => {
  const [submit, setSubmit] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        identifier: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        identifier: Yup.string().required("Please enter username"),
        password: Yup.string().required("Please enter password"),
      }),
      onSubmit: async (values) => {
        setSubmit(true);
        setLoginError(null);

        try {
          const response = await axios.post(`${BASE_URL}${AUTH_PATH}`, values);
          setAuth(response.data);
          setSuccess(true);
          if (response.status === 200) {
            history.push("/admin");
          }
        } catch (err) {
          console.log("error", err);
          setLoginError(err.toString());
        } finally {
          setSubmit(false);
        }
      },
    });

  return (
    <div className="login">
      <Helmet>
        <title>Holidaze | Login</title>
      </Helmet>
      <div className="login__container">
        <h1 className="login__heading">Admin login</h1>
        <div>
          <form className="login__form" onSubmit={handleSubmit}>
            {loginError ? (
              <p className="login__error">Invalid password or username</p>
            ) : null}
            <fieldset className="login__field" disabled={submit}>
              {success ? (
                <p className="login__success">Successfully logged in</p>
              ) : null}
              <div className="login__box">
                <label className="login__label">Username/Email</label>
                <input
                  className="login__input"
                  value={values.identifier}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="identifier"
                  placeholder="Username"
                />
                {touched.identifier && errors.identifier ? (
                  <p className="login__error">{errors.identifier}</p>
                ) : null}
              </div>

              <div className="login__box">
                <label className="login__label">Password</label>
                <input
                  className="login__input"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                {touched.password && errors.password ? (
                  <div className="login__error">{errors.password}</div>
                ) : null}
              </div>
              <button className="login__button btn" type="submit">
                {submit ? "Loggin in..." : "Login"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
