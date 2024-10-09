"use client";

import { AppBar, Container, styled, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import ElevationScroll from "./ElevationScroll";
import HeaderUserMenu from "./HeaderUserMenu";

const Header = () => {
  const email = useAppSelector((state) => state.auth.email);

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
            <LogoText variant="h6">scaling</LogoText>
            {email && <HeaderUserMenu />}
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

const LogoText = styled(Typography)({
  letterSpacing: ".3rem",
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 700,
});

export default Header;
