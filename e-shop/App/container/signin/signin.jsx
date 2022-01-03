import React from 'react';
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};

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

    return errors;
};

const url = 'https://localhost:7078/';

export const SignInForm = () => {
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            let queryTrailer = 'token?username=' + values.userName;
            queryTrailer += '&password=' + values.password;

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
                if (response.status == '200') {
                    alert('Status 200');
                    response.text().then(token => {
                        localStorage.setItem('token', token);
                        alert('Token has been set: ' + token);
                    })
                    
                }
            });
        }
        ,
        onLogOut: (e) => {
            alert(localStorage.getItem('token'));
            
        }
        ,
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="userName">Логин: </label>
                <input type="text" id="userName" name="userName" onChange={formik.handleChange} value={formik.values.userName} />
                {formik.errors.userName ? <div>{formik.errors.userName}</div> : null}

                <label htmlFor="password">Пароль: </label>
                <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}

                <button type="submit">Submit</button>

            </form>
            {localStorage.getItem('token') ? <button type="button" onClick={e => localStorage.removeItem('token')}>Log Out</button> : null}
        </div>
        
    )
}

export default SignInForm;