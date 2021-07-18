import React from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css'

const LoginForm = ({ handleLogin, username, password, handleLoginUserNameChange, handleLoginPasswordChange }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:
            <input
              className="form-input-username"
              type="text"
              value={username}
              name="username"
              onChange={handleLoginUserNameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              className="form-input-password"
              type="password"
              value={password}
              name="password"
              onChange={handleLoginPasswordChange}
            />
          </label>
        </div>
        <button type="submit" className="form-submit-button">Login</button>
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