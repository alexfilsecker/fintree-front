import axios, { type AxiosResponse } from "axios";
import Cookies from "js-cookie";

import { saveRefreshToken, saveToken } from "@/utils/auth";

const baseURL = "http://localhost:3030";

export const post = async <A, RT>(
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

export const get = async <A, RT>(
  path: string,
  params: A,
  withToken = true
): Promise<AxiosResponse<RT, any>> => {
  let token: string | undefined;
  if (withToken) {
    token = Cookies.get("token");
  }
  const url = `${baseURL}/${path}`;
  return await axios.get<RT>(url, {
    params,
    headers: {
      Authorization: withToken ? `Bearer ${token}` : undefined,
    },
  });
};

export const patch = async <A, RT>(
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
    method: "PATCH",
    url,
    data: body,
    headers: {
      Authorization: withToken ? `Bearer ${token}` : undefined,
      "Content-Type": "application/json",
    },
  });
};

export const wierdPatch = async <A, B, RT>(
  path: string,
  body: B,
  params: A,
  withToken = true
): Promise<AxiosResponse<RT, any>> => {
  let token: string | undefined;
  if (withToken) {
    token = Cookies.get("token");
  }
  const url = `${baseURL}/${path}/`;

  return await axios<RT>({
    method: "PATCH",
    url,
    data: body,
    params,
    headers: {
      Authorization: withToken ? `Bearer ${token}` : undefined,
      "Content-Type": "application/json",
    },
  });
};

type NewTokenPayload = {
  status: number;
  responseData: {
    newToken: string;
    newRefreshToken: string;
  };
};

export const requestNewToken = async (refreshToken: string): Promise<void> => {
  const body = {
    refreshToken,
  };

  const url = `${baseURL}/auth/refresh`;
  const response = await axios.post<NewTokenPayload>(url, body);
  if (response === undefined) {
    throw new Error("Token refresh failed");
  }
  const { data } = response;
  saveToken(data.responseData.newToken);
  saveRefreshToken(data.responseData.newRefreshToken);
};
