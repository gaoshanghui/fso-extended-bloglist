import React from 'react';
import './LoginStatusBar.scss';

const LoginStatusBar = ({ loggedInUser, handelLogout }) => {
  const loggedUserInfo = loggedInUser;
  const loggedUserName = loggedUserInfo.name;

  return (
    <div className="LoginStatusBar">
      <div className="LoginStatusBar__user-infomation">{`Hello! ${loggedUserName}`}</div>
      <button className="LoginStatusBar__logout-button" onClick={handelLogout}>logout</button>
    </div>
  );
}

export default LoginStatusBar;
