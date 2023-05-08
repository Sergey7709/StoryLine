import axios from 'axios';
import { BASE_URL } from '../common/constants';
export type BodyFetchUserRequest = {
  password: string;
  email: string;
};
export type BodyUpdateUserRequest = {
  id: number;
  name: string;
  userImageUrl: string;
  about: string;
  phone: string;
  address: string;
};
export type BodyRegisterUserRequest = BodyFetchUserRequest &
  BodyUpdateUserRequest &
  Omit<BodyFetchUserRequest, 'id'> & {
    isAdmin: boolean;
  };
type Params = 'user/current' | 'user/register' | 'user/login' | 'user/update';
export const fetchUser = async (
  params: Params,
  body?: BodyFetchUserRequest | BodyUpdateUserRequest | BodyRegisterUserRequest,
  token?: string,
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token ?? '',
  };
  try {
    switch (params) {
      case 'user/current':
        const responseGet = await axios.get(BASE_URL + params, { headers });
        return responseGet.data;
      case 'user/register':
      case 'user/login':
        const responsePost = await axios.post(BASE_URL + params, body, { headers });
        return responsePost.data;
      case 'user/update':
        const responsePut = await axios.put(BASE_URL + params, body, { headers });
        return responsePut.data;
      default:
        throw new Error('Неверный параметр');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
