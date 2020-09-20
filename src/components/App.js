import React, { useEffect, useState } from 'react';

import AppRouter from './Router';
import { authService } from '../fbApp';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.languageCode = 'ko';

    const initialAuth = async () => {
      await authService.onAuthStateChanged((user) => {
        if (user) {
          setUserObj(() => ({
            uid: user.uid,
            displayName: user.displayName,
            updateProfile: (args) => user.updateProfile(args),
          }));
        }
        setInit(() => true);
      });
    };

    initialAuth();
  }, []);

  // 리액트에서 파이어베이스의 변화를 감지하기 위해 사용
  const refreshUser = () => {
    const user = authService.currentUser;

    setUserObj(() => ({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    }));
  };

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        '초기화중...'
      )}
      <footer>&copy; {new Date().getFullYear()} ppby </footer>
    </>
  );
}

export default App;
