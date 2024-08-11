import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import './LoginForm.css';
import * as client from "../../../data/client";
import Starfield from 'react-starfield';
import ReCAPTCHA from "react-google-recaptcha";
import * as constants from "../../../constants/constants";

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [captchaVerified, setCaptchaVerified] = useState(false);

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

        if (!captchaVerified) {
            setErrors('Please verify the captcha.');
            return;
        }

        client.getJWTByUserCredentials(login, password).then((jwtToken) => {
            localStorage.setItem('jwtToken', jwtToken);
            window.location.reload();
        }).catch(err => {
            setErrors(err);
        })
    };

    const onCaptchaChange = (value) => {
        if (value) {
            setCaptchaVerified(true);
            setErrors('');
        } else {
            setCaptchaVerified(false);
        }
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
            <div className="captcha-container">
                <ReCAPTCHA sitekey={constants.SITE_SECRET_KEY}
                           onChange={onCaptchaChange}/>
            </div>

            {errors && <div className="error">{errors}</div>}
            {captchaVerified && (
                <Button style={{fontWeight: "bold"}}
                        type="submit">
                    Log in
                </Button>
            )}
        </form>
    );
};

export default LoginForm;
