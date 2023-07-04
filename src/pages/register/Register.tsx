import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createAccount } from "../../api";

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
    <div>
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
        <Form>
          <Field type="text" name="name" placeholder="Name" />

          <Field type="text" name="hobbies" placeholder="hobbies" />

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
            Register
          </button>
        </Form>
      </Formik>

      <p>
        Have an account? <Link to={"/login"}>Login here.</Link>
      </p>
    </div>
  );
}
