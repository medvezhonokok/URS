import React, {useState} from 'react';
import axios from 'axios';
import * as constants from '../../../constants/constants';
import {Button} from 'react-bootstrap';
import './LoginForm.css';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const setLoginOrPasswordValue = (e) => {
        const {name, value} = e.target;

        if (name === 'login') {
            setLogin(value);
        } else if (name === 'password') {
            setPassword(value);
        } else {
            throw Error('Unexpected error.');
        }
    };

    const authenticateUserByJWT = (jwtToken) => {
        localStorage.setItem('jwtToken', jwtToken);

        axios.get(constants.BACKEND_JAVA_URL + `/1/users/auth?jwt=${jwtToken}`)
            .then((response) => {
                const user = JSON.stringify(response.data);
                localStorage.setItem('user', user);
                window.location.reload();
            }).catch((err) => {
            console.error('Failed to fetch user information:', err);
        });
    };

    const submitLoginForm = (e) => {
        e.preventDefault();

        axios.post(constants.BACKEND_JAVA_URL + '/1/jwt', {
            login,
            password,
        }).then((response) => {
            authenticateUserByJWT(response.data);
        }).catch((err) => {
            console.error('Authentication failed:', err);
            setErrors({authentication: 'Invalid login or password'});
        });
    };

    return (
        <form className="loginForm" onSubmit={submitLoginForm}>
            <div>
                <label>Login:</label>
                <input type="text" name="login" value={login} onChange={setLoginOrPasswordValue}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={setLoginOrPasswordValue}/>
            </div>
            {errors.authentication && <div className="error">{errors.authentication}</div>}
            <Button type="submit">Log in</Button>
        </form>
    );
};

export default LoginForm;
