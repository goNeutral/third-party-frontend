"use client";

import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = (): JSX.Element => {
  const { login, isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user?.name}</p>
        <p>Role: {user?.role}</p>
      </div>
    );
  }

  return (
    <div className='p-10 w-full flex justify-center'>
      <button
        onClick={() => login()}
        className="p-2 w-fit bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;