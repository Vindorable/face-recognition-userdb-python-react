import React from "react";
import { Box, Stack } from "@mui/material";


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

      </Box>
    </>
  );
}


// ---------------------------------------------------------

export default Navbar;