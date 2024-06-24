import { Container, Button } from "@mui/material";
import { BreakPoints } from "../data/app.constant";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { Link, useNavigate } from "react-router-dom";
import { SignUpSchema } from "../schemas/auth.schema";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const initialValues = {
  file: "",
  name: "",
  userName: "",
  email: "",
  contactNumber: "",
  password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // const [error, setError] = useState(null);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const change = (e: any) => {
    console.log(e.target.files[0]);
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchema,

    onSubmit: (values) => {
      console.log(values);
      dispatch(addUser(values));
      navigate("/dashboard");
    },
  });

  return (
    <div className="register-container">
      <Container maxWidth={BreakPoints.XS} className=" my-4 bg-light rounded py-3">
        <>
          <h2 className="text-center text-blueviolet ">Sign Up</h2>
          <p className="text-center --bs-secondary-color ">Enter your credentials to continue</p>
        </>

        <div className="justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <FormControl fullWidth variant="outlined" className="mt-4">
                  <OutlinedInput
                    fullWidth
                    name="file"
                    onChange={(event: any) => {
                      setFieldValue("file", event?.target?.files?.[0] || null);
                    }}
                    onBlur={handleBlur}
                    type="file"
                    label=""
                  />
                </FormControl>
                {errors.file && touched.file ? <p className="text-danger text-sm">{errors.file}</p> : null}
              </div>
              <div className="col-lg-6 col-md-12 mt-4">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel className={errors.name && touched.name ? "text-danger" : ""} htmlFor="outlined-adornment-password">
                    Enter Your Name
                  </InputLabel>
                  <OutlinedInput
                    error={errors.name && touched.name ? true : undefined}
                    type="text"
                    name="name"
                    label="Enter Your Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                {errors.name && touched.name ? <p className="text-danger text-sm">{errors.name}</p> : null}
              </div>
              <div className="col-lg-6 col-md-12 mt-4">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel className={errors.userName && touched.userName ? "text-danger" : ""} htmlFor="outlined-adornment-password">
                    User Name
                  </InputLabel>
                  <OutlinedInput
                    error={errors.userName && touched.userName ? true : undefined}
                    type="text"
                    name="userName"
                    label="UserName"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                {errors.userName && touched.userName ? <p className="text-danger text-sm">{errors.userName}</p> : null}
              </div>
              <div className="col-lg-6 col-md-12">
                <FormControl variant="outlined" fullWidth className="mt-4">
                  <InputLabel className={errors.email && touched.email ? "text-danger" : ""} htmlFor="outlined-adornment-password">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    error={errors.email && touched.email ? true : undefined}
                    type="text"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                {errors.email && touched.email ? <p className="text-danger text-sm">{errors.email}</p> : null}
              </div>
              <div className="col-lg-6 col-md-12">
                <FormControl variant="outlined" fullWidth className="mt-4">
                  <InputLabel
                    className={errors.contactNumber && touched.contactNumber ? "text-danger" : ""}
                    htmlFor="outlined-adornment-password"
                  >
                    Contact Number
                  </InputLabel>
                  <OutlinedInput
                    error={errors.contactNumber && touched.contactNumber ? true : undefined}
                    type="number"
                    name="contactNumber"
                    label="Contact Number"
                    value={values.contactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                {errors.contactNumber && touched.contactNumber ? <p className="text-danger text-sm">{errors.contactNumber}</p> : null}
              </div>
              <div className="col-lg-12">
                <FormControl fullWidth variant="outlined" className="mt-4">
                  <InputLabel className={errors.password && touched.password ? "text-danger" : ""} htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={errors.password && touched.password ? true : undefined}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {errors.password && touched.password ? <p className="text-danger text-sm">{errors.password}</p> : null}
              </div>
              <div className="col-lg-12">
                <Button type="submit" fullWidth className="submit-btn font-weight mt-4">
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
          <hr className="mt-4 border" />
        </div>
        <>
          <p className="text-center fw-bold ">
            <Link className="text-decoration-none text-blueviolet" to={"/"}>
              Already have an account?
            </Link>
          </p>
        </>
      </Container>
    </div>
  );
};

export default Register;
