import React, { useEffect, useState } from "react";

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
      {file &&
        <img
          src={file}
          style={{
            width: "350px",
            height: "300px",
            objectFit: "contain"
          }}
        />
      }
    </>
  );
}


// ---------------------------------------------------------

export default ViewTest;