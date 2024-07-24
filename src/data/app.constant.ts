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

export enum SortBy {
  ASC = "asc",
  DESC = "desc",
}

export enum AppDefaults {
  MAX_FILE_SIZE = 2000000,
  PAGE_NO = 0,
  PAGE_LIMIT = 5,
  SORT = "createdAt",
  SORT_BY = "desc",
  LIST_ROW_HEIGHT = 50,
  PAGINATION_AND_SORTING_MODE = "server",
}

const API_HOST = process.env.REACT_APP_API_HOST;

export const API_URLS = {
  // Auth
  LOGIN: `${API_HOST}/auth/login`,
  GOOGLE_LOGIN: `${API_HOST}/auth/google-login`,
  REGISTER: `${API_HOST}/auth/register`,
  LOGOUT: `${API_HOST}/auth/logout`,

  // Customers
  CUSTOMERS: `${API_HOST}/customers`,
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

export enum AccountTypeLabel {
  LOCAL = "HRS Local",
  GOOGLE = "Google",
}

export enum RouteType {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum DateFormats {
  DD_MM_YYYY = "DD/MM/YYYY",
  DD_MM_YYYY_H_MM_A = "DD/MM/YYYY h:mm A",
}

export enum StatusColors {
  ACTIVE = "#4caf50",
  INACTIVE = "#f44336",
}

export const PageSizeOptions = [5, 10, 25, 50];

export enum HttpStatus {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLYHINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}

export const MateialColors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#ff1744",
  "#f50057",
  "#d500f9",
  "#651fff",
  "#3d5afe",
  "#2979ff",
  "#00b0ff",
  "#00e5ff",
  "#1de9b6",
  "#00e676",
  "#76ff03",
  "#c6ff00",
  "#ffea00",
  "#ffc400",
  "#ff9100",
  "#ff3d00",
];
