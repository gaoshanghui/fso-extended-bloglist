import React from 'react';

const LoginStatusBar = ({ loggedInUser, handelLogout }) => {
  const loggedUserInfo = loggedInUser;
  const loggedUserName = loggedUserInfo.name

  return (
    <div>
      {`${loggedUserName} logged in`}
      <button onClick={handelLogout}>logout</button>
    </div>
  )
}

export default LoginStatusBar;
