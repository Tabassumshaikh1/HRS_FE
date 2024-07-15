export enum BreakPoints {
  XS = "xs",
}

export enum AppMessages {
  DEFAULT_ERROR = "An unexpected error occurred, please try again later",
  REQUIRED = "This field is required",
  LOGIN_SUCCESS = "Login successfully",
  REGISTER_SUCCESS = "Registered successfully",
  LOGOUT_SUCCESS = "Logged out successfully",
}

export enum AppDefaults {
  MAX_FILE_SIZE = 2000000,
}

const API_HOST = process.env.REACT_APP_API_HOST;

export const API_URLS = {
  LOGIN: `${API_HOST}/auth/login`,
  GOOGLE_LOGIN: `${API_HOST}/auth/google-login`,
  REGISTER: `${API_HOST}/auth/register`,
  LOGOUT: `${API_HOST}/auth/logout`,
};

export enum ImageMimeType {
  "image/png" = "png",
  "image/jpeg" = "jpg",
  "image/jpg" = "jpg",
}

export enum SliceAndReducersName {
  LOGGED_IN_USER = "loggedInUser",
  TOKEN = "token",
  LOADER = "loader",
}

export enum LocalStorageKeys {
  LOGGED_IN_USER = "_hrs_logged_in_user",
  TOKEN = "_hrs_token",
}

export enum UserRoles {
  ADMIN = "ADMIN",
  DRIVER = "DRIVER",
  CUSTOMER = "CUSTOMER",
}

export enum ActivityStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export enum AccountType {
  LOCAL = "local",
  GOOGLE = "google",
}
