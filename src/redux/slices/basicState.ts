export type BasicState = {
  loading: boolean;
  success: boolean;
  error: boolean;
};

export const basicInitialState: BasicState = {
  loading: false,
  success: false,
  error: false,
};

export const basicRejectedState: BasicState = {
  loading: false,
  success: false,
  error: true,
};

export const basicPendingState: BasicState = {
  loading: true,
  success: false,
  error: false,
};

export const basicFulfilledState: BasicState = {
  loading: false,
  success: true,
  error: false,
};
