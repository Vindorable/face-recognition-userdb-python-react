import React from "react";
import { Stack } from "@mui/material";


// ---------------------------------------------------------

const BodyWrapper = ({ children }) => {
  return (
    <>
      <Stack
        p={2}
        sx={{
          width: "100vw",
          maxWidth: "100%", // This is very Important else there will be the 100vw scrollbar issue.
          flexGrow: 1,
          height: "100%",
          overflowY: "scroll",
        }}
      >
        <Stack
          direction={"row"}
          sx={{ width: "100%" }}
          justifyContent={"space-evenly"}
        >
          <Stack
            position={"relative"}
            spacing={1}
            p={3}
            sx={{
              backgroundColor: "#f5f5f5",
              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
              width: {
                xs: "100%", // 0px
                md: "80%",  // 900px
                lg: "60%",  // 1200px
              },
              maxWidth: "896px",
            }}
          >

            {children}

          </Stack>
        </Stack>
      </Stack>
    </>
  );
}


// ---------------------------------------------------------

export default BodyWrapper;