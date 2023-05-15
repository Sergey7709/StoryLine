import axios from 'axios';
import { BASE_URL } from '../common/constants';

type Params = string;
export const fetchFavorites = async (params: Params, token: string) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  try {
    const responsePost = await axios.post(BASE_URL + params, {}, { headers });
    return responsePost.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
