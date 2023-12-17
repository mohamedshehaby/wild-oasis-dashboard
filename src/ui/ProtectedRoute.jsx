import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

import FullPage from './FullPage';
import Spinner from './Spinner';

function ProtectedRoute({ children }) {
  // 1- Check if user exists
  const { isLoading, user } = useUser();
  const navigate = useNavigate();
  const isAuthenticated = user?.aud === 'authenticated';

  // 3- If user is not logged in, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  // 2- If user is loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return isAuthenticated ? children : <></>;
}

export default ProtectedRoute;
