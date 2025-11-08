const BASE_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;

export const Constants = {
  API_URL: BASE_URL,
  API_VERSION: API_VERSION,

  AUTH_ENDPOINTS: {
    SIGN_IN: "/auth/sign-in",
    SIGN_UP: "/auth/sign-up",
    REFRESH_TOKEN: "/auth/refresh",
    SIGN_OUT: "/auth/sign-out",
  },

  PROFILE_ENDPOINTS: {
    GET_PROFILE: "/users/profile",
  },
};
