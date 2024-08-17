import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Router from "next/router";

import { getRefreshToken, getToken, isTokenExpired } from "../utils/auth";

import { deleteRequest, get, patch, post, requestNewToken } from "./api";
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

type Extras = {
  rejectValue: KnownError;
  pendingMeta: { url: string };
  fulfilledMeta: { url: string };
  rejectedMeta: { url: string };
};

export type GeneralRequest<RT = unknown, A = void> = AsyncThunk<RT, A, Extras>;

type fixPathReturnType<A> = {
  path: string;
  params: A;
};

const fixPath = <A extends object>(
  path: string,
  params: A extends object ? A : never
): fixPathReturnType<A> => {
  if (typeof params !== "object" || params === null) {
    throw new Error("Params is not an object or is null");
  }

  const returnParams = { ...params };

  const keysToFind = path.match(/:[a-zA-Z0-9]*/g);
  if (keysToFind === null) {
    return { path, params };
  }
  keysToFind.forEach((key) => {
    const keyWithoutColon = key.slice(1);
    if (!(keyWithoutColon in params)) {
      throw new Error(`Key ${keyWithoutColon} not found in params`);
    }
    const asertedKey = keyWithoutColon as keyof A;
    const value = params[asertedKey];
    if (typeof value === "number") {
      path = path.replace(key, value.toString());
    } else if (typeof value === "string") {
      path = path.replace(key, value);
    } else {
      throw new Error(
        `Value of key ${keyWithoutColon} is not a number or a string`
      );
    }
    returnParams[asertedKey] = undefined as any;
  });

  return { path, params: returnParams };
};

const generateRequest = <RT = unknown, A = void>(
  method: "get" | "post" | "patch" | "put" | "delete",
  path: string,
  options: Options = defaultOptions
): GeneralRequest<RT, A> => {
  const typePrefix = `${method.toUpperCase()}:${path}`;

  return createAsyncThunk<RT, A, Extras>(
    typePrefix,
    async (params: A, thunkApi) => {
      let fixedPath = path;
      let fixedParams = params;
      if (typeof params === "object" && params !== null) {
        const fix = fixPath(path, params);
        fixedPath = fix.path;
        fixedParams = fix.params;
      }
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
          return thunkApi.rejectWithValue(handleGeneralActionError(error), {
            url: fixedPath,
          });
        }
      }

      let response;
      try {
        switch (method) {
          case "post": {
            response = await post<A, AxiosReturnType<RT>>(
              fixedPath,
              fixedParams,
              options.withToken
            );
            break;
          }

          case "get": {
            response = await get<A, AxiosReturnType<RT>>(
              fixedPath,
              fixedParams,
              options.withToken
            );
            break;
          }

          case "patch": {
            response = await patch<A, AxiosReturnType<RT>>(
              fixedPath,
              fixedParams,
              options.withToken
            );
            break;
          }

          case "put": {
            console.error("PUT method not implemented");
            throw new Error("PUT method not implemented");
          }

          case "delete": {
            response = await deleteRequest<A, AxiosReturnType<RT>>(
              fixedPath,
              fixedParams,
              options.withToken
            );
            break;
          }

          default:
            console.error("Method not implemented");
            throw new Error("Method not implemented");
        }
      } catch (error: unknown) {
        const returnError = handleGeneralActionError(error);
        return thunkApi.rejectWithValue(returnError, { url: fixedPath });
      }

      return thunkApi.fulfillWithValue(response.data.responseData, {
        url: fixedPath,
      });
    },
    {
      getPendingMeta: ({ arg }) => {
        let fixedPath = path;
        if (typeof arg === "object" && arg !== null) {
          const fix = fixPath(path, arg);
          fixedPath = fix.path;
        }
        return { url: fixedPath };
      },
    }
  );
};

export default generateRequest;
