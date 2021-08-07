import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
  return (
    <div className="Navigation">
      <Link className="Navigation__Link" to='/blogs'>Blogs</Link>
      <Link className="Navigation__Link" to='/users'>Users</Link>
    </div>
  );
}

export default Navigation;
