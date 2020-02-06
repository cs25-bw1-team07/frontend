import React from "react";
import { NavLink } from 'react-router-dom';
import {connect} from "react-redux";

import {Form, Field, withFormik} from "formik/dist/index";
import * as Yup from "yup";

import {userRegister} from '../store/auth/Actions';

import '../styles/auth.scss';



const RegisterForm = () => {
  return (
    <div className="auth-container">
      <h1 className="header">Sign Up</h1>
      <div className="form-container">
        <div className="corner-one"></div>
        <div className="corner-two"></div>
        <div className="corner-three"></div>
        <div className="corner-four"></div>
        <Form className="form-contents">

            <Field className="form-inputs" type="text" placeholder="Username *" name="username" />
            <Field className="form-inputs" type="password" placeholder="Password *" name="password1" />
            <Field className="form-inputs" type="password" placeholder="Confirm Password *" name="password2" />


          <div className="btn-container">
            <button className="submit-btn" type="submit">
              REGISTER
            </button>
          </div>
            <div className="switch-link">
              <p>Have an account? Login</p>
              <NavLink to={"/login"}>
                <span>HERE</span>
              </NavLink>
            </div>
        </Form>
      </div>
    </div>
  );
};

const FormikRegisterForm = withFormik({
  mapPropsToValues({ username, password1, password2 }) {
    return {
      username: username || "",
      password1: password1 || "",
      password2: password2 || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required('Please enter a username'),
    password1: Yup.string().required('Enter a password'),
    password2: Yup.string().required('confirm password')
}),

  handleSubmit(values, { props }) {
    props.userRegister(values, props.history).then(() =>
    props.history.push('/')
    )
  }

})(RegisterForm);

const mapStateToProps = state => {
    return {
      token: state.registerReducer.token,
      err: state.registerReducer.error
  };
};


export default connect(mapStateToProps,{userRegister})(FormikRegisterForm);