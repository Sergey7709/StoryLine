import { useState } from 'react';

export const useSaveTokenLocalStorage = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const saveToken = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  return [token, saveToken];
};
