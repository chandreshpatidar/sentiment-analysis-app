'use client';
import { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '@/config';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = cookie.get(ACCESS_TOKEN_KEY);

  useEffect(() => {
    setIsAuthenticated(Boolean(token));
  }, [token]);

  return isAuthenticated;
};

export default useAuth;
