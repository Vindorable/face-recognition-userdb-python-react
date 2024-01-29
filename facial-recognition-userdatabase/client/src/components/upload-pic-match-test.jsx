// ********************
// ONLY FOR TESTING.
// IN ACTUAL PRODUCTION ONLY USE PIC UPLOADED FROM CAMERA.
// ********************
import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const UploadPicMatchTest = () => {
  const [match, setMatch] = useState("");

  const [testFile, setTestFile] = useState();
  const handleFileUpload = (e) => {
    setMatch("")
    setTestFile(e.target.files[0]);
  }

  const convertToBase64 = () => {
    setMatch("Pending...")
    const reader = new FileReader()

    reader.readAsDataURL(testFile)

    reader.onload = () => {
      console.log("called: ", reader);
      console.log(reader.result);

      axios
        .post("http://127.0.0.1:5000/face_recognition", {
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
          if (res.data == "200") {
            setMatch("Matched!")
          } else {
            setMatch("Unknown..")
          }
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
      <Stack
        p={2}
        sx={{ boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}
      >
        <Stack pt={2} spacing={2}>
          <Typography inline align="center" variant="h6">Test</Typography>

          {testFile &&
            <img
              src={URL.createObjectURL(testFile)}
              style={{
                width: "350px",
                height: "300px",
                objectFit: "contain"
              }}
            />
          }

          {testFile &&
            <Typography inline align="center" variant="body2">{match}</Typography>
          }

          <Button component="label" variant="contained">
            {testFile ? "Change file" : "Choose file"}
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileUpload}
              accept=".jpg,.jpeg,.png"
            />
          </Button>

          {testFile &&
            <Button component="label" variant="contained" onClick={convertToBase64}>
              Upload
            </Button>
          }
        </Stack>
      </Stack>
    </>
  );
}


// ---------------------------------------------------------

export default UploadPicMatchTest;