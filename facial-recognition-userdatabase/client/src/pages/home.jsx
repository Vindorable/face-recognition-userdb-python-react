import React, { useState } from "react";
import { Divider, Stack, Tab, Tabs, Typography } from "@mui/material";

import BodyWrapper from "../components/body-wrapper";
import UploadPicOptions from "../components/upload-pic-options";


// ---------------------------------------------------------

const Home = () => {
  // Tabs.
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <BodyWrapper>
        <Divider />
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography variant="h6">FACIAL RECOGNITION</Typography>
          <Typography variant="body2">Store a picture of yourself, or anyone you authorise, to be able to log into your account.</Typography>
        </Stack>
        <Divider />

        {/* Tabs */}
        {/* ---- */}
        <Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Upload Pic" />
              <Tab label="View Test" />
            </Tabs>
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            {/* IIFE (Immediately Invoked Function Expressions) */}
            {(() => {
              switch (value) {
                case 0:
                  // Upload Pic.
                  return <UploadPicOptions />
                case 1:
                  // View Test.
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </BodyWrapper>
    </>
  );
}


// ---------------------------------------------------------

export default Home;