import React, { useEffect, useState } from "react";

import axios from "axios";


// ---------------------------------------------------------

const IsSessionValid = () => {
  const [session, setSession] = useState(false);

  const getSession = () => {
    axios
      .get("http://127.0.0.1:5000/get_session", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log(res);
        setSession(true);
      })
      .catch(err => {
        if (!err.response) {
          console.log("Error: Network Error (possibly server is down)");
        } else {
          console.log(err.response.data);
        }
        setSession(false);
      });
  }

  useEffect(() => {
    getSession();
  }, []);

  return session;
}


// ---------------------------------------------------------

export { IsSessionValid };