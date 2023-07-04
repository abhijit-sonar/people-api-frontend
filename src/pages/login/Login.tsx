import { Field, Form, Formik } from "formik";
import { login } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(form: LoginFormData) => {
          login(form.email, form.password).then(() => {
            navigate("/");
          });
        }}
      >
        <Form>
          <Field name="email" type="email" placeholder="e-mail"></Field>
          <Field name="password" type="password" placeholder="Password"></Field>

          <div>
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

          <button type="submit" disabled={!termsAccepted}>
            Login
          </button>
        </Form>
      </Formik>

      <p>
        Don't have an account? <Link to={"/register"}>Create one</Link>
      </p>
    </div>
  );
}
