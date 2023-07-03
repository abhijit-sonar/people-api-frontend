import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createAccount } from "../../api";

import local from "./register.module.css";
import global from "../../globalStyle.module.css";
const style: any = {};
Object.assign(style, global, local);

type RegisterFormData = {
  email: string;
  password: string;
  name: string;
  hobbies: string;
};

export default function Register() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className={style.container}>
      <h2>Register</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          hobbies: "",
        }}
        onSubmit={(form: RegisterFormData) => {
          const accountDetails = { ...form, hobbies: form.hobbies.split(" ") };
          createAccount(accountDetails).then(() => {
            navigate("/");
          });
        }}
      >
        <Form className={style.form}>
          <Field
            className={style.textField}
            type="text"
            name="name"
            placeholder="Name"
          />

          <Field
            className={style.textField}
            type="text"
            name="hobbies"
            placeholder="hobbies"
          />

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

          <div className={style.terms}>
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
            className={`${style.actionButton} ${style.large} ${style.mt3}`}
          >
            Register
          </button>
        </Form>
      </Formik>

      <p className={`${style.mt1}`}>
        Have an account? <Link to={"/login"}>Login here.</Link>
      </p>
    </div>
  );
}
