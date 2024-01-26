import React, { useState } from "react";
import { Button, Stack, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";

import WebcamCapture from "./webcam-capture";

import axios from "axios";


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

const UploadPicOptions = () => {
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

      axios
        .post("http://127.0.0.1:5000/upload", {
          data: reader.result
        }, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          if (!err.response) {
            console.log("Error: Network Error (possibly server is down)");
          } else {
            console.log(err.response.data);
          }
        });
    }
  }

  return (
    <>
      {/* Tabs */}
      {/* ---- */}
      <Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="From Device" />
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
                // From Device.
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
    </>
  );
}


// ---------------------------------------------------------

export default UploadPicOptions;