import axios, { type AxiosResponse } from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3030";

const post = async <A, RT>(
  path: string,
  body: A,
  withToken = true
): Promise<AxiosResponse<RT, any>> => {
  let token: string | undefined;
  if (withToken) {
    token = Cookies.get("token");
  }
  const url = `${baseURL}/${path}`;
  return await axios<RT>({
    method: "POST",
    url,
    data: body,
    headers: {
      Authorization: withToken ? `Bearer ${token}` : undefined,
    },
  });
};

export default post;
