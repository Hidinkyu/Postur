import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './LandingPage.js';
import AllPosts from './allPosts.js';


const App = () => {
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);

    const [hasToken, setHasToken] = useState(false);
    useEffect(() => {
      localStorage.getItem('token') ? setHasToken(true) : setHasToken(false);
    });

  return (
    <>
      <Routes >
        {!hasToken ? (
          <Route path='/' element={<LandingPage setLoggedIn={setLoggedIn} />} />
        ) : (
          <Route path='/' element={<AllPosts />} />
        )}
      </Routes>
    </>
  );
};

export default App;
