import axios from "axios";
import { BASE_URL } from "../common/constants";

export const fetchItem = async (param: string) => {
  try {
    console.log(`${BASE_URL}item/${param}`);
    const responseGet = await axios.get(`${BASE_URL}item/${param}`);
    return responseGet.data;
  } catch (error) {
    console.error(`Ошибка запроса Item: ${error}`);
    throw error;
  }
};
