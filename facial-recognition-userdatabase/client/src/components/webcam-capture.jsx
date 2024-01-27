import React, { useCallback, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

import Webcam from "react-webcam";


// ---------------------------------------------------------

const WebcamCapture = () => {
  const [deviceId, setDeviceId] = useState("");
  const [devices, setDevices] = useState([]);

  const handleDevices = useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    //navigator.mediaDevices.enumerateDevices().then(devices => console.log(devices));
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    if (devices[0] != undefined) {
      console.log("Default deviceId is set after filtering media devices types.");
      setDeviceId(devices[0].deviceId);
    }
  }, [devices]);

  const handleChange = (event) => {
    setDeviceId(event.target.value);
  };

  return (
    <>
      <Stack>
        <Webcam
          audio={false}
          width={350}
          height={300}
          screenshotFormat="image/jpeg"
          videoConstraints={{ deviceId }}
        />

        <FormControl fullWidth>
          <InputLabel id="select-label">Device</InputLabel>
          <Select
            labelId="select-label"
            value={deviceId}
            label="Device"
            onChange={handleChange}
          >
            {devices.map((device, key) => (
              <MenuItem
                key={device.deviceId}
                value={device.deviceId}
              >
                {device.label || `Device ${key + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}


// ---------------------------------------------------------

export default WebcamCapture;