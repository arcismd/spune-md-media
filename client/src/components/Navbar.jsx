import React from 'react';
import logo from '../images/header/logo.png';
import add from '../images/header/add.png';
import login from '../images/header/login.png';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className='menu-wrapper'>
      <div className='nav'>
        <div className='logo'>
          <NavLink
            to={'/'}
          >
            <img 
              src={logo}
              alt='Logo'
              width={36}
              height={36}
            />
          </NavLink>
        </div>
        <div className='centered-bar'>
          <div className='flex-centered-bar'>
            <input className='search-bar'
              placeholder="Caută"
              />
              <NavLink
              to={'new'}
              >
                <button className='add-post-btn'>
                  <div className='flex-post-btn'>
                  <img 
                    src={add}
                    alt='Adaugă'
                    width={16}
                    height={16}
                  /> 
                  <span>Spune</span>
                  </div>
                </button>
              </NavLink>
            </div>
        </div>
        <div className='user-info'>
          <ul>
            <li>
              <NavLink
                to={'login'}
                className='flex-auth'
              >
              <span>Autentificare</span>
              <img className='login-icon'
                src={login}
                alt='Logare'
                width={16}
                height={16}
              />
             </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
