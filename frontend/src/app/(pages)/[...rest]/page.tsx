import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" className="font-mono">
        404
      </Typography>
      <Typography variant="h4" className="font-mono">
        Page not found
      </Typography>
    </Box>
  );
}
