import React from "react";
import { Box, Button, Stack } from "@mui/material";

// Routes.
import { Link } from "react-router-dom";
import { PATH_WEBPAGE } from "../routes/paths";


// ---------------------------------------------------------

const Navbar = () => {
  return (
    <>
      <Box
        p={2} // 2 * 8 (mui internal value) = 16px
        sx={{
          backgroundColor: "#f5f5f5",
          boxShadow: `0px 0px 2px #333`,
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
          <Button variant="contained" component={Link} to={PATH_WEBPAGE.general.home}>Home</Button>
          <Button variant="contained" component={Link} to={PATH_WEBPAGE.general.login}>Login</Button>
          <Button variant="contained" component={Link} to={PATH_WEBPAGE.general.signUp}>Sign Up</Button>
          <Button variant="contained" component={Link} to={PATH_WEBPAGE.general.login}>Logout</Button>
        </Stack>
      </Box>
    </>
  );
}


// ---------------------------------------------------------

export default Navbar;