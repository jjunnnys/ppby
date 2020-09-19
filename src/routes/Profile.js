import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../fbApp';

const Profile = () => {
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  return (
    <>
      <button type="button" onClick={onLogOutClick}>
        로그아웃
      </button>
    </>
  );
};

export default Profile;
