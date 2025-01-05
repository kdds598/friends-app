import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Login.module.css';
import { useLoginMutation, useSignUpMutation } from '../../Store/UserApi.js';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signUp, { isLoading: isSignupLoading }] = useSignUpMutation();
  const [selected, setSelected] = useState('signup');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = { username: '', password: '' };
    if (credentials.username.length < 4 || credentials.username.length > 30) {
      newErrors.username = 'Username must be between 4 and 30 characters';
    }
    if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear the error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      if (selected === 'login') {
        const response = await login(credentials).unwrap();
        localStorage.setItem('token', response.token);
        navigate('/');
      } else {
        const response = await signUp(credentials).unwrap();
        localStorage.setItem('token', response.token);

        navigate('/');
      }
    } catch (error) {
      const errorMessage = selected === 'login' ? 'Invalid username or password' : 'Error signing up';
      alert(errorMessage);
    }
  };

  return (
    <>
      <div className={styles.toggleContainer}>
        <button
          onClick={() => setSelected('login')}
          className={selected === 'login' ? styles.activeButton : styles.tabbutton}
        >
          Login
        </button>
        <button
          onClick={() => setSelected('signup')}
          className={selected === 'signup' ? styles.activeButton : styles.tabbutton}
        >
          Sign Up
        </button>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{selected === 'login' ? 'Login' : 'Sign Up'}</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              className={styles.input}
              required
            />
            {errors.username && <small style={{color:"Red"}} className={styles.error}>{errors.username}</small>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
            {errors.password && <small style={{color:"Red"}}  className={styles.error}>{errors.password}</small>}
            <button type="submit" className={styles.button} disabled={isSignupLoading || isLoginLoading}>
              {selected === 'login' ? (isLoginLoading ? 'Logging in...' : 'Log In') : (isSignupLoading ? 'Signing up...' : 'Sign Up')}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
