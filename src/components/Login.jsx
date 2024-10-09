import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';


const Login = () => {
    const {signinContext} = useAuth()
    const {register, handleSubmit} = useForm()
    const onSubmit = handleSubmit(async (data) => {
        try {
          console.log(data);
          
          const response = await signinContext(data);
          console.log(response)
        } catch (e) {
          console.error(e);
          
        } 
      });

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            style={styles.input}
            required
          />
        </div>


        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f4f4f4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '400px',
    padding: '20px',
    backgroundColor: 'gray',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '350px',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: 'black'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Login;