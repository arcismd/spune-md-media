import React from 'react';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div>
      <div className='login-register-switcher'>
        <h1 
          style={{color: '#e1e1e1'}}
        >Logare</h1>
         <span style={{color: '#b34f6d'}}>&#8594;</span>
        <Link
          to={'/register'}
        >
        <h1>Înregistrare</h1>
        </Link>
      </div>
    
      <div className='form-wrapper'>
        <div className='login-left-side-bar'>
        </div>
        <div className='login-right-side-bar'>
        <form onSubmit={e => e.preventDefault()}>
            <label>
              Nume de utilizator
              <input 
                type='text'
                placeholder='utilizator'
                className=''
              />
            </label>

            <label>
              Parolă
              <input 
                type='password'
                placeholder='parolă'
                className=''
              />
            </label>

            <button type='submit' className='log-btn'>Intră</button>
        </form>
        </div>
      </div>
    </div>
  )
}
