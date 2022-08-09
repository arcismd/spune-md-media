import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../redux/slices/auth';
import { useState } from 'react';

export const LoginPage = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [errLog, seterrLog] = useState('');

  const { 
    register, 
    handleSubmit, 
 } = useForm({
    defaultValues: {
      userName: '',
      password: ''
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return seterrLog('Nume sau parolă greșită')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } 
  };

  if (isAuth) {
    return <Navigate to='/'/>
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Nume de utilizator
              <input 
                type='text'
                placeholder='utilizator'
                { ...register('userName', { required: 'Scrie numele' })}
                className=''
              />
            </label>

            <label>
              Parolă
              <input 
                type='password'
                placeholder='parolă'
                { ...register('password', { required: 'Scrie numele' })}
                className=''
              />
            </label>

            <button type='submit' className='log-btn'>Intră</button>
        <p style={{color: '#B15557'}}>{errLog}</p>
        </form>
        </div>
      </div>
    </div>
  )
}
