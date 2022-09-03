import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from "formik";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom"
import './SiginUpFrom.scss'
const LoginFrom = props => {
  const history = useNavigate();
    const handleSubmit = props.handleSubmit ? props.handleSubmit : undefined;
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
          confirmedPassword: "",
        },
        validationSchema: Yup.object({          
          email: Yup.string()
            .required("Required")
            .matches(
              /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              "Please enter a valid email address"
            ),
          password: Yup.string()
            .required("Required")
            .matches(
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
              "Password must be 7-19 characters and contain at least one letter, one number and a special character"
            ),
          confirmedPassword: Yup.string()
            .required("Required")
            .oneOf([Yup.ref("password"), null], "Password must match"),
          
        }),
        onSubmit: (values) => {
          
          handleSubmit(values.email, values.password);
          history("/");
        },
      });
  return (
    <section>
    <form className="from" onSubmit={formik.handleSubmit}>
        <div className="from__group">
            <label> Email address </label>
            <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter your email"
            />
            {formik.errors.email && (
                <p className="errorMsg"> {formik.errors.email} </p>
            )}
        </div>
        <div className="from__group">
            <label> Password </label>
            <input
                type="Password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter your password"
            />
            {formik.errors.password && (
                <p className="errorMsg"> {formik.errors.password} </p>
            )}
        </div>
        <div className="from__group">
            <label> Confirm Password </label>
            <input
                type="text"
                id="confirmedPassword"
                name="confirmedPassword"
                value={formik.values.confirmedPassword}
                onChange={formik.handleChange}
                placeholder="Confirm your password"
            />
            {formik.errors.confirmedPassword && (
                <p className="errorMsg"> {formik.errors.confirmedPassword} </p>
            )}
            
        </div>
        <Link to={"/account/login"}>
          <p className="from__Sigin__link">Bạn đã có tài khoản ?</p>
        </Link>
      <button type="submit" className='from__submit'> Continue </button>
    </form>
  </section>
  )
}

LoginFrom.propTypes = {}

export default LoginFrom