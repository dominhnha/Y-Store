import React from 'react'
import PropTypes from 'prop-types'
import './SiginInFrom.scss'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
const SiginInFrom = props => {
    const handleSubmit = props.handleSubmit ? props.handleSubmit : undefined;
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
          
        },
        validationSchema: Yup.object({          
          email: Yup.string()
            .required("Required")
            .matches(
              /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              "Please enter a valid email address"
            ),
        //   password: Yup.string()
        //     .required("Required")
        //     .matches(
        //       /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
        //       "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        //     ),
          
          
        }),
        onSubmit: (values) => {
          console.log(values);
          handleSubmit(values.email, values.password);
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
        <Link to={"/account/siginUp"}>
          <p className="from__Sigin__link">Bạn chưa có tài khoản ?</p>
        </Link>
      <button type="submit" className='from__submit'> Continue </button>
    </form>
  </section>
  )
}

SiginInFrom.propTypes = {}

export default SiginInFrom