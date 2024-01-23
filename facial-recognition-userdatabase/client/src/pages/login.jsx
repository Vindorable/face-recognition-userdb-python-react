import React from "react";
import { Divider, Stack, Typography } from "@mui/material";

import BodyWrapper from "../components/body-wrapper";


// ---------------------------------------------------------

const Login = () => {
  return (
    <>
      <BodyWrapper>
        <Divider />
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography variant="h6">LOGIN</Typography>
          <Typography variant="body2">Don't have an account, yet? <b>Create Account</b></Typography>
        </Stack>
        <Divider />
      </BodyWrapper>
    </>
  );
}


// ---------------------------------------------------------

export default Login;