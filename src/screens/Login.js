import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      alert('Enter a Valid Credentials!');
    }
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('authToken', json.authToken);
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className='container mt-5 '>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              name='email'
              value={credentials.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              name='password'
              onChange={handleChange}
              value={credentials.password}
              placeholder='Enter Password'
            />
          </div>

          <button type='submit' className='m-3 btn bg-success'>
            Submit
          </button>
          <Link to='/createuser' className='m-3 btn btn-warning'>
            I'm a new User
          </Link>
        </form>
      </div>
    </div>
  );
};
