import * as Yup from "yup";

import { AppMessages } from "../data/app.constant";

const LoginSchema = Yup.object({
  userName: Yup.string().required(AppMessages.REQUIRED),
  password: Yup.string().min(8).required(AppMessages.REQUIRED),
});

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required(AppMessages.REQUIRED),
  userName: Yup.string().required(AppMessages.REQUIRED),
  email: Yup.string().email().required(AppMessages.REQUIRED),
  contactNumber: Yup.string().min(10).max(10).required(AppMessages.REQUIRED),
  password: Yup.string()
    .min(8)
    .required(AppMessages.REQUIRED)
    .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and lowercase character")
    .matches(/\d/, "Password should contain at least one number")
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
});

export { LoginSchema, SignUpSchema };
