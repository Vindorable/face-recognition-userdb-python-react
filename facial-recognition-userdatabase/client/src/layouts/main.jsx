import React from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

import Navbar from "../components/navbar";


// ---------------------------------------------------------

const MainLayout = () => {
  return (
    <>
      <Stack height={"100%"} maxHeight={"100dvh"} width={"auto"}>
        <Navbar />
        <Outlet />
      </Stack>
    </>
  );
}


// ---------------------------------------------------------

export default MainLayout;