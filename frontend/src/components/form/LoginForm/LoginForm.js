import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import './LoginForm.css';
import * as client from "../../../data/client";
import Starfield from 'react-starfield';

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

        client.getJWTByUserCredentials(login, password).then((jwtToken) => {
            localStorage.setItem('jwtToken', jwtToken);
            window.location.reload();
        }).catch(err => {
            setErrors(err);
        })
    };

    return (
        <form className="loginForm" onSubmit={submitLoginForm}>
            <Starfield
                starCount={1000}
                starColor={[255, 255, 255]}
                speedFactor={0.05}
                backgroundColor="black"
            />
            <div>
                <label>login</label>
                <input type="text" name="login" value={login} onChange={setLoginOrPasswordValue} autoFocus={true}/>
            </div>
            <div>
                <label>password</label>
                <input type="password" name="password" value={password} onChange={setLoginOrPasswordValue}/>
            </div>

            {errors && <div className="error">{errors}</div>}
            <Button style={{fontWeight: "bold"}}
                    type="submit">
                Log in
            </Button>
        </form>
    );
};

export default LoginForm;
