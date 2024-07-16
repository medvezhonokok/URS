import React, {useState} from 'react';
import axios from 'axios';
import * as constants from '../../../constants/constants';
import {Button} from 'react-bootstrap';
import './LoginForm.css';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

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

    const submitLoginForm = (e) => {
        e.preventDefault();

        axios.post(constants.BACKEND_JAVA_URL + '/1/jwt', {
            login,
            password,
        }).then((response) => {
            localStorage.setItem('jwtToken', response.data);
            window.location.reload();
        }).catch((err) => {
            setErrors(err.response.data);
        });
    };

    return (<form className="loginForm" onSubmit={submitLoginForm}>
            <div>
                <label>login</label>
                <input type="text" name="login" value={login} onChange={setLoginOrPasswordValue}/>
            </div>
            <div>
                <label>password</label>
                <input type="password" name="password" value={password} onChange={setLoginOrPasswordValue}/>
            </div>
            {errors && <div className="error">{errors}</div>}
            <Button style={{fontWeight: "bold"}} type="submit">Log in</Button>
        </form>
    );
};

export default LoginForm;
