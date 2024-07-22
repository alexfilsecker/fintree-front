import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Router from "next/router";

import { getRefreshToken, getToken, isTokenExpired } from "../utils/auth";

import { get, post, requestNewToken } from "./api";
import handleGeneralActionError from "./handleGeneralActionError";

import type { KnownError } from "./knownError";
import type { AsyncThunk } from "@reduxjs/toolkit";

type Options = {
  withToken: boolean;
};

type AxiosReturnType<T> = {
  status: number;
  responseData: T;
};

const defaultOptions: Options = {
  withToken: true,
};

const generateRequest = <RT = unknown, A = void>(
  method: "get" | "post" | "patch" | "put",
  path: string,
  options: Options = defaultOptions
): AsyncThunk<RT, A, { rejectValue: KnownError }> => {
  const typePrefix = `${method.toUpperCase()}:${path}`;
  return createAsyncThunk<RT, A, { rejectValue: KnownError }>(
    typePrefix,
    async (params: A, thunkApi) => {
      if (options.withToken) {
        try {
          const token = getToken();
          if (token === undefined) {
            throw new Error("Token is undefined");
          }
          if (isTokenExpired(token)) {
            const refreshToken = getRefreshToken();
            if (refreshToken === undefined) {
              throw new Error("Refresh token is undefined");
            }
            await requestNewToken(refreshToken);
          }
        } catch (error: unknown) {
          Cookies.remove("token");
          Cookies.remove("refreshToken");
          void Router.push("/").then(async () => {
            window.location.reload();
          });
          return thunkApi.rejectWithValue(handleGeneralActionError(error));
        }
      }
      try {
        switch (method) {
          case "post": {
            const response = await post<A, AxiosReturnType<RT>>(
              path,
              params,
              options.withToken
            );

            return response.data.responseData;
          }

          case "get": {
            const response = await get<A, AxiosReturnType<RT>>(
              path,
              params,
              options.withToken
            );

            return response.data.responseData;
          }
          default:
            return null as RT;
        }
      } catch (error: unknown) {
        const returnError = handleGeneralActionError(error);
        return thunkApi.rejectWithValue(returnError);
      }
    }
  );
};

export default generateRequest;
