import { Field, Form, Formik } from "formik";
import { login } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import local from "./login.module.css";
import global from "../../globalStyle.module.css";
const style: any = {};
Object.assign(style, global, local);

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className={style.container}>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(form: LoginFormData) => {
          login(form.email, form.password).then(() => {
            navigate("/");
          });
        }}
      >
        <Form className={style.form}>
          <Field
            className={style.textField}
            name="email"
            type="email"
            placeholder="e-mail"
          ></Field>
          <Field
            className={style.textField}
            name="password"
            type="password"
            placeholder="Password"
          ></Field>

          <div className={`${style.terms}`}>
            <input
              type="checkbox"
              id="checkbox-terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="checkbox-terms">
              I agree to the terms of service
            </label>
          </div>

          <button
            type="submit"
            disabled={!termsAccepted}
            className={`${style.actionButton} ${style.mt3} ${style.large}`}
          >
            Login
          </button>
        </Form>
      </Formik>

      <p className={`${style.mt1}`}>
        Don't have an account? <Link to={"/register"}>Create one</Link>
      </p>
    </div>
  );
}
