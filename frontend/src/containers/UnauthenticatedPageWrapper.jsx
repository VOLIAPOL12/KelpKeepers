import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function UnauthenticatedPageWrapper({children}) {
  const { isLoggedIn, loading } = useContext(AppContent);

  const navigate = useNavigate();

  useEffect(() => {
      if (!loading) {
          if (isLoggedIn) {
              navigate('/dashboard');
          }
      }
  }, [isLoggedIn, loading, navigate]);

  return (
    <>
        <main className="flex-grow">
          {children}
        </main>
    </>
  )
}

export default UnauthenticatedPageWrapper