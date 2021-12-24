import React from 'react';
import { useFormik } from 'formik';

const axios = require("axios");

const validate = values => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }

    if (!values.userName) {
        errors.userName = 'Required';
    } else if (values.userName.length < 4) {
        ;
        errors.userName = 'Mast be 4 characters or more';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or more';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const url = 'https://localhost:7078/';

export const SignupForm = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            email: '',
        },
        validate,
        //onSubmit: values => {
        //    alert(JSON.stringify(values, null, 2));
        //},
        onSubmit: values => {
            let queryTrailer = 'api/signup?firstName=' + values.firstName;
            queryTrailer += '&lastName=' + values.lastName;
            queryTrailer += '&userName=' + values.userName;
            queryTrailer += '&password=' + values.password;
            queryTrailer += '&email=' + values.email;

            //axios.post(url, values)
            //    .then(result => {
            //        alert(result);
            //    })

            fetch(url + queryTrailer, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(values)
            }).then(response => {
                alert(response.json());
            });
        }
        ,
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">Имя: </label>
            <input type="text" id="firstName" name="firstName" onChange={formik.handleChange} value={formik.values.firstName} />
            {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

            <label htmlFor="lastName">Фамилия: </label>
            <input type="text" id="lastName" name="lastName" onChange={formik.handleChange} value={formik.values.lastName} />
            {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

            <label htmlFor="userName">Логин: </label>
            <input type="text" id="userName" name="userName" onChange={formik.handleChange} value={formik.values.userName} />
            {formik.errors.userName ? <div>{formik.errors.userName}</div> : null}

            <label htmlFor="password">Пароль: </label>
            <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}

            <label htmlFor="email">Email-адрес: </label>
            <input id="email" type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}

            <button type="submit">Submit</button>
        </form>
        )
}

export default SignupForm;