"use client";

import React from "react";
import { useScrollTrigger } from "@mui/material";

type ElevationScrollProps = {
  children?: React.ReactElement<{ elevation?: number }>;
};

const ElevationScroll: React.FC<ElevationScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
};

export default ElevationScroll;
