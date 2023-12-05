import React, { FormEvent, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import Input from '../../common/Input/Input';
import './LoginBody.scss';
import { AuthorizationAPIs } from '../../../api/auth.api';

const LoginBody = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { isAuthed, setId } = useAuth();

    
    const handleLogin = (e: any) => {
        e.preventDefault();

        const email = emailInput.current?.value as string;
        const password = passwordInput.current?.value as string;

        AuthorizationAPIs.getID(email, password)
        .then((res) => {
            if (res) {
                if (
                    res.status === 200 ||
                    res.status === 204 ||
                    res.status === 304
                ) {
                    window.localStorage.setItem('id', res.data);
                    setId(res.data);
                    navigate(state?.path || '/education-program-list')
                }
                
            }

        })
        .catch((error) => {
            console.log(error);
        });
    };


    useEffect(() => {


        if(isAuthed) {
            navigate('/');
        }
    }, []);

    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

  return (
    <div className="loginBody">
        <div className="container">
            <div className="loginBody-wrapper">
                <div className="login-form-block">
                    <div className="form-container">
                        <form className="login-form">
                            <Input type="text" label_text="Логин" name="name" placeholder="Введите ваш логин" inputRef={emailInput} />
                            <Input type="password" label_text="Пароль" name="password" placeholder="Введите ваш пароль" inputRef={passwordInput} />
                            <button onClick={(e) => handleLogin(e)}>Войти</button>
                            <NavLink className="link" to="/signup">Регистрация</NavLink>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginBody