import React from "react";
import { Box, Button, Stack } from "@mui/material";

import axios from "axios";

// Routes.
import { Link, useNavigate } from "react-router-dom";
import { PATH_WEBPAGE } from "../routes/paths";
import { IsSessionValid } from "../functions/isSessionValid";


// ---------------------------------------------------------

const Navbar = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    axios
      .post("http://127.0.0.1:5000/logout", {}, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log(res);
        navigate(PATH_WEBPAGE.general.login);
        window.location.reload();
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
      <Box
        p={2} // 2 * 8 (mui internal value) = 16px
        sx={{
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          height: 60,
          width: "100vw",
          maxWidth: "100%", // This is very Important else there will be the 100vw scrollbar issue.
        }}
        zIndex={"100"}
      >
        <Stack
          spacing={2}
          sx={{ height: "100%" }}
          direction={"row"}
          alignItems={"center"}
        >
          {IsSessionValid() ?
            <>
              <Button variant="contained" component={Link} to={PATH_WEBPAGE.general.home}>Home</Button>
              <Button variant="contained" onClick={logoutUser}>Logout</Button>
            </>
            :
            <>
              <Button variant="contained" component={Link} to={PATH_WEBPAGE.general.login}>Login</Button>
              <Button variant="contained" component={Link} to={PATH_WEBPAGE.general.signUp}>Sign Up</Button>
            </>
          }
        </Stack>
      </Box>
    </>
  );
}


// ---------------------------------------------------------

export default Navbar;