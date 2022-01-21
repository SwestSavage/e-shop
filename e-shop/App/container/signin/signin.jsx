import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { constants } from './signinConstants.jsx';

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
            let queryTrailer = '?username=' + values.userName;
            queryTrailer += '&password=' + values.password;

            fetch(constants.tokenUrl + queryTrailer, {
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
                   // alert('Status 200');
                    response.text().then(token => {
                        localStorage.setItem('token', token);
                        localStorage.setItem('userName', values.userName);
                        localStorage.setItem('signedIn', true);
                        alert('Пользователь ' + values.userName + ' успешно вошел!');
                    })

                    fetch(constants.isAdmin + '?username=' + values.userName)
                        .then(response => {
                            response.json().then(result => {
                                if (result) {
                                    localStorage.setItem('isAdmin', result);
                                }

                            });
                        });
                }
            });
        }
        ,
    });
    return (
        <div>
            {localStorage.getItem('signedIn') ?
                <div>Вы успешно вошли! <Link to="/" >Продукты.</Link></div>
                :
                <form onSubmit={formik.handleSubmit}>

                <label htmlFor="userName">Логин: </label>
                <input type="text" id="userName" name="userName" onChange={formik.handleChange} value={formik.values.userName} />
                {formik.errors.userName ? <div>{formik.errors.userName}</div> : null}

                <label htmlFor="password">Пароль: </label>
                <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}

                <button type="submit">Submit</button>
                <Link to="/" >Войти</Link>

            </form>}
            
        </div>
        
    )
}

export default SignInForm;