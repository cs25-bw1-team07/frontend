import React from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import {Form, Field, withFormik} from 'formik/dist/index';
import * as Yup from 'yup';

import {userLogin} from '../store/auth/Actions';

import '../styles/auth.scss';

const LoginForm = () => {

return (
        <>
            <div className="auth-container">
                <h1 className= "header">Login</h1>
                <div className="form-container">
                    <div className="corner-one"></div>
                    <div className="corner-two"></div>
                    <div className="corner-three"></div>
                    <div className="corner-four"></div>
                    <Form className="form-contents">
                        <label>
                            <Field className="form-inputs" type="text" placeholder="Username *" name="username"/>
                        </label>
                        <label>
                            <Field className="form-inputs" type="password" placeholder="Password *" name="password"/>
                        </label>
                        <div className="btn-container">
                            <button className="submit-btn" type="submit">LOGIN</button>
                        </div>
                        <div className="switch-link">
                            <p>Don't have an account? Sign up</p>
                            <NavLink to={"/registration"}>
                                <span>
                                    HERE
                                </span>
                            </NavLink>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

const FormikLoginForm = withFormik({
    mapPropsToValues({username, password}) {
        return {
            username: username || '',
            password: password || ''
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required('Please enter username'),
        password: Yup.string().required('Enter a password')
    }),

    handleSubmit(values, {props}) {
        props.userLogin(values, props.history);
    }
})(LoginForm);

const mapStateToProps = state => {
    return {
        token: state.loginReducer.token,
        error: state.loginReducer.error
    };
};


export default connect(mapStateToProps, {userLogin})(FormikLoginForm);