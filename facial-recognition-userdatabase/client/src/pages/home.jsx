import React, { useState } from "react";
import { Button, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles"

import BodyWrapper from "../components/body-wrapper";
import WebcamCapture from "../components/webcam-capture";


// ---------------------------------------------------------

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});


// ---------------------------------------------------------

const Home = () => {
  // Tabs.
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [file, setFile] = useState();
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  }

  const convertToBase64 = () => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      console.log("called: ", reader);
      console.log(reader.result);
    }
  }

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
              <Tab label="Upload" />
              <Tab label="Take A Pic" />
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
                  // Upload.
                  return <>
                    <Stack pt={2} spacing={2}>
                      {file &&
                        <img
                          src={URL.createObjectURL(file)}
                          style={{
                            width: "350px",
                            height: "300px",
                            objectFit: "contain"
                          }}
                        />
                      }

                      <Button component="label" variant="contained">
                        {file ? "Change file" : "Choose file"}
                        <VisuallyHiddenInput
                          type="file"
                          onChange={handleFileUpload}
                          accept=".jpg,.jpeg,.png"
                        />
                      </Button>

                      {file &&
                        <Button component="label" variant="contained" onClick={convertToBase64}>
                          Upload
                        </Button>
                      }
                    </Stack>
                  </>
                case 1:
                  // Take A Pic.
                  return <WebcamCapture />
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