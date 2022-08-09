import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../redux/slices/auth';

export const RegisterPage = () => {

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [errLog, seterrLog] = useState('');

  const { 
    register, 
    handleSubmit, 
 } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: ''
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return seterrLog('Introduceți coerent datele')
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Nume de utilizator*
              <input 
                type='text'
                placeholder='min. 3 caractere'
                { ...register('userName', { required: 'Scrie numele' })}
                className=''
              />
            </label>

            <label>
              Email*
              <input 
                type='email'
                placeholder='pepe@gmail.com'
                { ...register('email', { required: 'Scrie emailul' })}
                className=''
              />
            </label>

            <label>
              Parolă*
              <input 
                type='password'
                placeholder='min. 6 caractere'
                { ...register('password', { required: 'Scrie parola' })}
                className=''
              />
            </label>

            <button type='submit' className='reg-btn'>Creează un cont</button>
            <p style={{color: '#B15557'}}>{errLog}</p>
        </form>
        </div>
      </div>
    </div>
  )
}
