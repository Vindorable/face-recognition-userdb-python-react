import React, { useEffect, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";

import WebcamCapture from "./webcam-capture";

import axios from "axios";


// ---------------------------------------------------------

const ViewTest = () => {
  const [file, setFile] = useState();

  const getFile = () => {
    axios
      .get("http://127.0.0.1:5000/get_file", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log(res);
        setFile(`data:image/jpeg;base64,${res.data.data}`)
      })
      .catch(err => {
        if (!err.response) {
          console.log("Error: Network Error (possibly server is down)");
        } else {
          console.log(err.response.data);
        }
      });
  }

  useEffect(() => {
    getFile();
  }, []);

  return (
    <>
      <Stack spacing={3}>
        <Typography inline align="center" variant="body2">Image file in the backend:</Typography>
        {file &&
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
            <img
              src={file}
              style={{
                width: "350px",
                height: "300px",
                objectFit: "contain"
              }}
            />
          </Stack>
        }

        <Divider />

        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
          <WebcamCapture />
        </Stack>
        <Typography inline align="center" variant="body2">Take a pic of yourself and see if the Facial Recognition matches.</Typography>
      </Stack>
    </>
  );
}


// ---------------------------------------------------------

export default ViewTest;