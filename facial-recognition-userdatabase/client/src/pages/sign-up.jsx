import React from "react";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";

import BodyWrapper from "../components/body-wrapper";

import { useFormik } from "formik";
import * as yup from "yup";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { PATH_WEBPAGE } from "../routes/paths";


// ---------------------------------------------------------

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character.`;
};

const validationSchema = yup.object({
  email: yup
    .string("Enter your email.")
    .email("Enter a valid email.")
    .required("Email is required."),
  password: yup
    .string("Enter your password.")
    .min(8, "Password must have at least 8 characters.")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .required("Password is required."),
  confirmPassword: yup
    .string("Please re-type your password.")
    .oneOf([yup.ref("password")], "Passwords does not match."),
});


// ---------------------------------------------------------

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
    },
  });

  const registerUser = () => {
    axios
      .post("http://127.0.0.1:5000/signup", {
        email: formik.values.email,
        password: formik.values.password
      })
      .then(res => {
        console.log(res);
        navigate(PATH_WEBPAGE.general.home);
      })
      .catch(err => {
        if (!err.response) {
          console.log("Error: Network Error (possibly server is down)");
        } else {
          console.log(err.response.data);
        }
      });
  }

  return (
    <>
      <BodyWrapper>
        <Divider />
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography variant="h6">SIGN UP</Typography>
          <Typography variant="body2">Already have an account? <b>Login</b></Typography>
        </Stack>
        <Divider />

        <Divider sx={{ visibility: "hidden", borderBottomWidth: 10 }} />

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="* Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="* Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="* Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />

            <Button type="submit" onClick={registerUser}>Submit</Button>
          </Stack>
        </form>
      </BodyWrapper>
    </>
  );
}


// ---------------------------------------------------------

export default SignUp;