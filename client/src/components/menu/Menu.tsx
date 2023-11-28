import React from 'react'
import logo from '../../assets/images/logo.svg';
import './Menu.scss';

const Menu = ({ children }: any) => {
  return (
    <div className="menu">
        <div className="container">
          <div className="menu-wrapper">
            <div className="logo-info">
                  <img src={logo} alt="logo" />
                  <div>Каталог учебных планов и программ ЛЭТИ</div>
              </div>
              <div className="content-block">
                  { children }
              </div>
            </div>  
        </div>
    </div>
  )
}

export default Menu