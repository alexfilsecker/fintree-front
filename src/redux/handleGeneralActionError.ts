import { AxiosError } from "axios";

import { type KnownError } from "./knownError";

const handleGeneralActionError = (error: unknown): KnownError => {
  if (!(error instanceof Error)) {
    return {
      type: "Unknown",
      status: 500,
      message: "Unknown Error",
      stack: "No Stack",
    };
  }

  if (!(error instanceof AxiosError) || error.response === undefined) {
    return {
      type: "Error",
      status: 500,
      message: error.message,
      stack: error.stack,
    };
  }

  const res = error.response;

  if (res.data.errorData === undefined || res.data.errorData === null) {
    return {
      type: "Error",
      status: res.status,
      message: res.data.message,
      stack: error.stack,
    };
  }

  const errorData: KnownError = res.data.errorData;
  if (errorData.type === "ValidationError") {
    return {
      type: "ValidationError",
      status: res.status,
      message: errorData.message,
      validationErrors: errorData.validationErrors,
    };
  }

  if (errorData.type === "LoginError") {
    return {
      type: "LoginError",
      status: res.status,
      message: errorData.message,
      errorIn: errorData.errorIn,
    };
  }

  return {
    type: "Error",
    status: res.status,
    message: errorData.message,
    stack: error.stack,
  };
};

export default handleGeneralActionError;
