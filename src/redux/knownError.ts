type ValidationError = object;

export type CertainErrorTypes = "Unknown" | "Error";

type NormalError = {
  status: number;
  message: string;
  stack?: string;
};

export type CertainError = NormalError & {
  type: CertainErrorTypes;
};

type CValidationError = NormalError & {
  type: "ValidationError";
  validationErrors: ValidationError[];
};

export type KnownError = CertainError | CValidationError;
