import axios from "axios";
import { BASE_URL } from "../common/constants";
import { PostCreate, PostUpdate, ReviewUpdate } from "../common/types";

export type FetchType = "post" | "get" | "put" | "delete";
export const fetchHandler = async (
  type: FetchType,
  params: string,
  body?: PostCreate | PostUpdate | ReviewUpdate,
  token?: string
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: token ?? "",
  };
  try {
    switch (type) {
      case "get":
        const responseGet = await axios.get(BASE_URL + params, { headers });
        return responseGet.data;

      case "post":
        const responsePost = await axios.post(BASE_URL + params, body, {
          headers,
        });
        return responsePost.data;
      case "put":
        const responsePut = await axios.put(BASE_URL + params, body, {
          headers,
        });

        return responsePut.data;
      case "delete":
        const responseDelete = await axios.delete(BASE_URL + params, {
          headers,
        });
        return responseDelete.data;
      default:
        throw new Error("Неверный параметр");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
