import React from "react";

import Webcam from "react-webcam";


// ---------------------------------------------------------

const WebcamCapture = () => {
  return (
    <>
      <Webcam
        audio={false}
        width={350}
        height={300}
        screenshotFormat="image/jpeg"
      />
    </>
  );
}


// ---------------------------------------------------------

export default WebcamCapture;