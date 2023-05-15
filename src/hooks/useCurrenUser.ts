import { useMutation } from 'react-query';
import { fetchUser } from '../api/authApi';
import { userReceived } from '../redux/authSlice';
import { useAppDispatch } from '../redux/redux.hooks';
import { useSaveTokenLocalStorage } from './useSaveTokenLocalStorage';

export const useCurrentUser = () => {
  const [token] = useSaveTokenLocalStorage();
  const dispatch = useAppDispatch();
  const { mutateAsync } = useMutation(async () => {
    if (!token || typeof token !== 'string') return;
    const response = await fetchUser('user/current', undefined, token);
    return response;
  });
  const getCurrentUser = async () => {
    const data = await mutateAsync();
    if (data !== null) {
      dispatch(userReceived(data));
    }
  };
  return getCurrentUser;
};
