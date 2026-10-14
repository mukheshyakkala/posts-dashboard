
import { Box, CircularProgress, Typography } from "@mui/material";
import "./LoadingFallback.css";

export default function LoadingFallback() {
  return (
    <Box className="loading-fallback" role="status" aria-live="polite">
      <CircularProgress className="loading-fallback__spinner" />

      <Typography className="loading-fallback__text">
        Loading application...
      </Typography>
    </Box>
  );
}