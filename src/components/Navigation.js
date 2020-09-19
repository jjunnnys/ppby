import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <na>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/profile">프로필</Link>
        </li>
      </ul>
    </na>
  );
};

export default Navigation;
