import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <div>
    <div className='login-register-switcher'>
      <Link
        to={'/login'}
      >
      <h1>Logare</h1>
      </Link>
      <span style={{color: '#468400'}}>&#8592;</span>
      <h1
        style={{color: '#e1e1e1'}}
      >Înregistrare</h1>
    </div>
  
    <div className='form-wrapper'>
        <div className='register-left-side-bar'>
        </div>
        <div className='register-right-side-bar'>
        <form onSubmit={e => e.preventDefault()}>
            <label>
              Nume de utilizator*
              <input 
                type='text'
                placeholder='utilizator'
                className=''
              />
            </label>

            <label>
              Email*
              <input 
                type='email'
                placeholder='pepe@gmail.com'
                className=''
              />
            </label>

            <label>
              Parolă*
              <input 
                type='password'
                placeholder='min. 6 caractere'
                className=''
              />
            </label>

            <label>
              Repetă Parola*
              <input 
                type='password'
                placeholder='parolă'
                className=''
              />
            </label>

            <button type='submit' className='reg-btn'>Creează un cont</button>
        </form>
        </div>
      </div>
    </div>
  )
}
