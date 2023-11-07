import React from 'react';
import './LoginHeader.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';

const LoginHeader = () => {
  return (
    <div className="loginHeader">
        <div className="container">
          <div className="loginHeader-wrapper">
            <div className="logo-info">
                  <img src={logo} alt="logo" />
                  <div>Каталог учебных планов и программ ЛЭТИ</div>
              </div>
              <div className="signup-button-block">
                  <NavLink to="/signup" className="signup-button">Создать аккаунт</NavLink>
              </div>
            </div>  
        </div>
    </div>
  )
}

export default LoginHeader;