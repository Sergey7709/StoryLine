import { useEffect } from 'react';
import { useSaveTokenLocalStorage } from './useSaveTokenLocalStorage';
import { useAppDispatch } from '../redux/redux.hooks';
import { useQuery } from 'react-query';
import { fetchUser } from '../api/authApi';
import { userReceived } from '../redux/authSlice';

export const useAutoLogin = () => {
  const [token] = useSaveTokenLocalStorage();
  const dispatch = useAppDispatch();
  const { data } = useQuery(['userData', token], async () => {
    if (!token || typeof token !== 'string') return;
    const response = await fetchUser('user/current', undefined, token);
    return response;
  });
  useEffect(() => {
    if (data) dispatch(userReceived(data));
  }, [dispatch, data]);
};
