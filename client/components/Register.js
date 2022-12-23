import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Register = ({ setLoggedIn }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {});

  const handleSubmit = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    await Axios.post('http://localhost:3000/api/user/register', {
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }).then((res) => {
      if (res.data.hasOwnProperty('failed')) {
        alert(res.data.failed);
      } else {
        localStorage.setItem('token', 'Bearer ' + res.data);
        setLoggedIn(true);
      }
    });
  };

  return (
    <>
      <div>
        <form className='auth' onSubmit={(e) => registerUser(e)}>
          <input
            onChange={(e) => handleSubmit(e)}
            id='username'
            type='text'
            value={data.username}
            placeholder='Username'
            required
          />
          <input
            onChange={(e) => handleSubmit(e)}
            id='password'
            type='Password'
            value={data.password}
            placeholder='Password'
            required
          />
          <input
            onChange={(e) => handleSubmit(e)}
            id='confirmPassword'
            type='Password'
            value={data.confirmPassword}
            placeholder='Confirm Password'
            required
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
