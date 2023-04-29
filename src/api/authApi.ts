import axios from 'axios';
import { BASE_URL } from '../common/constants';
export type BodyFetchUserRequest = {
  password: string;
  email: string;
  name?: string;
};
export const fetchUser = async (params: string, body?: BodyFetchUserRequest, token?: string) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token ?? '',
  };
  try {
    if (token) {
      const response = await axios.get(BASE_URL + params, { headers });
      return response.data;
    } else {
      const response = await axios.post(BASE_URL + params, body, { headers });
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
