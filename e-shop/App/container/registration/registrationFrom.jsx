import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

localStorage.setItem('signedUp', false);

const validate = values => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Необходимо заполнить';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Должно быть не более 15 символов';
    }

    if (!values.lastName) {
        errors.lastName = 'Необходимо заполнить';
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Должно быть не более 20 символов';
    }

    if (!values.userName) {
        errors.userName = 'Необходимо заполнить';
    } else if (values.userName.length < 4) {
        ;
        errors.userName = 'Должно быть не менее 4 символов';
    }

    if (!values.password) {
        errors.password = 'Необходимо заполнить';
    } else if (values.password.length < 6) {
        errors.password = 'Должно быть не менее 6 символов';
    }

    if (!values.email) {
        errors.email = 'Необходимо заполнить';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Неверный e-mail адрес';
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

        onSubmit: values => {
            let queryTrailer = 'api/signup?firstName=' + values.firstName;
            queryTrailer += '&lastName=' + values.lastName;
            queryTrailer += '&userName=' + values.userName;
            queryTrailer += '&password=' + values.password;
            queryTrailer += '&email=' + values.email;

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
                localStorage.setItem('signedUp', true);
                alert('Регистрация прошла успешно! Можете воспользоваться формой входа.');
            });
        }
        ,
    });
    return (
        <div>
            {localStorage.getItem('signedUp') ?
                <div>
                    Регистрация прошла успешно! Можете воспользоваться формой входа.
                    <Link to="/signin" onClick={e => localStorage.removeItem('signedUp')}>Вход</Link>
                </div>

                : <form onSubmit={formik.handleSubmit} className="signUp">
                    {localStorage.getItem('token') ? <div>Allready logged in!</div> : <div className="signUp">
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

                    <button type="submit">Зарегистрироваться</button>
                </div>}
            </form>}
        </div>
        )
}

export default SignupForm;