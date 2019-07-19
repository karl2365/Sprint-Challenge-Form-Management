import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Login({ touched, errors, }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Redirect to="/friends" />;
  }

  return (
    <Form className="form">
      <div className="form-group">
        <label className="label">Username</label>
        <Field
          className="input"
          name="username"
          type="text"
          autoComplete="off"
        />
        <p>{touched.username && errors.username}</p>
      </div>
      <div className="form-group">
        <label className="label">Password</label>
        <Field
          className="input"
          name="password"
          type="password"
          autoComplete="off"
        />
      </div>
      <p>{touched.password && errors.password}</p>
      <button className="btn" type="submit">Submit &rarr;</button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues() {
    return {
      username: "",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required(),
    password: Yup.string()
      .min(6)
      .required()
  }),
  handleSubmit(values, formikBag) {
      console.log(values);
    const url =
      "http://localhost:5000/api/login";
    axios
      .post(url, values)
      .then(response => {
        console.log(response.data.payload);
        localStorage.setItem("token", response.data.payload);
        formikBag.props.history.push("/friends");
      })
      .catch(e => {
        console.log(e.response);
      });
  }
})(Login);
