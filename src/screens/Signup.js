import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      alert('Enter a Valid Credentials!');
    } else {
      alert('User Successfully Created! Redirecting to Home Page...');
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container mt-5 '>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            name='name'
            onChange={handleChange}
            value={credentials.name}
            placeholder='Enter your name'
          />
        </div>

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

        <div className='mb-3'>
          <label htmlFor='geolocation' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            name='geolocation'
            onChange={handleChange}
            value={credentials.geolocation}
            placeholder='Enter your Address'
          />
        </div>

        <button type='submit' className='m-3 btn btn-success'>
          Submit
        </button>
        <Link to='/login' className='m-3 btn btn-warning'>
          Already a User?
        </Link>
      </form>
    </div>
  );
};

export default Signup;
