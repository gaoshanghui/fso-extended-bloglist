import React from 'react';
import PropTypes from 'prop-types';
import './LoginForm.scss';

const LoginForm = ({ handleLogin, username, password, handleLoginUserNameChange, handleLoginPasswordChange }) => {
  return (
    <div className="LoginForm">
      <form onSubmit={handleLogin}>
        <div>
          <label className="LoginForm__label">
            <input 
              className="LoginForm__form-input"
              type="text"
              value={username}
              name="username"
              onChange={handleLoginUserNameChange}
              placeholder="Username"
            />
          </label>
        </div>
        <div>
          <label className="LoginForm__label">
            <input 
              className="LoginForm__form-input"
              type="password"
              value={password}
              name="password"
              onChange={handleLoginPasswordChange}
              placeholder="Password"
            />
          </label>
        </div>
        <button className="LoginForm__form-submit-button" type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLoginUserNameChange: PropTypes.func.isRequired,
  handleLoginPasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm