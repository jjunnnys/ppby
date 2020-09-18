import React, { useState } from 'react';

import AppRouter from './Router';
import { authService } from '../fbApp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} ppby </footer>
    </>
  );
}

export default App;
