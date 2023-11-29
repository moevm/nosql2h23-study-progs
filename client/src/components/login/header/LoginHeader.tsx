import React from 'react';
import './LoginHeader.scss';
import { NavLink } from 'react-router-dom';
import Menu from '../../menu/Menu';

const LoginHeader = () => {
  return (
	<Menu>
		<NavLink to="/signup" className="signup-button">Создать аккаунт</NavLink>
	</Menu>
  )
}


export default LoginHeader;