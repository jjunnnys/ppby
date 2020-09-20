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
          setUserObj(() => user);
        }
        setInit(() => true);
      });
    };

    initialAuth();
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        '초기화중...'
      )}
      <footer>&copy; {new Date().getFullYear()} ppby </footer>
    </>
  );
}

export default App;
