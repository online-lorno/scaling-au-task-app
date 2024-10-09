"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import ElevationScroll from "./ElevationScroll";

const Header = () => {
  return (
    <ElevationScroll>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" className="font-mono">
            Task Management
          </Typography>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
