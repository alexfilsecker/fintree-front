import type { ZodIssue } from "zod";

type NormalError = {
  status: number;
  message: string;
  stack?: string;
};

type CUnknownError = NormalError & {
  type: "Unknown";
};

type CError = NormalError & {
  type: "Error";
};

type CValidationError = NormalError & {
  type: "ValidationError";
  validationErrors: ZodIssue[];
};

type CLoginError = NormalError & {
  type: "LoginError";
  errorIn: "username" | "password";
};

export type KnownError =
  | CUnknownError
  | CError
  | CValidationError
  | CLoginError;
