export enum BreakPoints {
  XS = "xs",
}

export enum AppMessages {
  DEFAULT_ERROR = "An unexpected error occurred, please try again later",
  REQUIRED = "This field is required",
  LOGIN_SUCCESS = "Login successfully",
}

export enum AppDefaults {
  MAX_FILE_SIZE = 2000000,
}

export enum API {
  LOGIN_API = "http://localhost:5000/auth/login",
  GOOGLE_LOGIN_API = "http://localhost:5000/auth/google-login",
}

export enum ImageMimeType {
  "image/png" = "png",
  "image/jpeg" = "jpg",
  "image/jpg" = "jpg",
}
