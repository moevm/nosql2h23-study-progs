import React, { FormEvent, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import Input from '../../common/Input/Input';
import './LoginBody.scss';

const LoginBody = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { authed, setAuthed } = useAuth();

    
    const handleLogin = (e: any) => {
        e.preventDefault();
        setAuthed(true);
        console.log(state?.path)
        navigate(state?.path || '/catalog')
    };

    const ref = useRef<any>({name: "", password: ""});

    const onChangeHandler = (text: string, name: string) => {
        ref.current[name] = text;
    }

    useEffect(() => {


        if(authed) {
            navigate('/');
        }
    }, []);

    


  return (
    <div className="loginBody">
        <div className="container">
            <div className="loginBody-wrapper">
                <div className="login-form-block">
                    <div className="form-container">
                        <form className="login-form">
                            <Input type="text" label_text="Логин" name="name" placeholder="Введите ваш логин" onChange={() => {}} />
                            <Input type="password" label_text="Пароль" name="password" placeholder="Введите ваш пароль" onChange={() => {}} />
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