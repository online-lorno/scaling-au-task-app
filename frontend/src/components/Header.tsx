"use client";

import Link from "next/link";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "@/lib/redux/hooks";
import ElevationScroll from "./ElevationScroll";
import HeaderUserMenu from "./HeaderUserMenu";

const Header = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <ElevationScroll>
      <AppBar>
        <Container>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href="/" passHref legacyBehavior>
              <Typography
                variant="h6"
                component="a"
                sx={{
                  letterSpacing: ".3rem",
                  fontFamily: "var(--font-geist-mono)",
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                scaling
              </Typography>
            </Link>
            {isAuthenticated && <HeaderUserMenu />}
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
