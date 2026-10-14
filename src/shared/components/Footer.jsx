import { memo } from "react";
import { Box, Container, Typography } from "@mui/material";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" className="app-footer">
      <Container maxWidth="xl" className="app-footer__container">
        <Typography variant="body2" className="app-footer__text">
          © {currentYear} React Dashboard. All rights reserved.
        </Typography>
        <Typography variant="body2" className="app-footer__subtext">
          Designed for high-performance enterprise applications.
        </Typography>
      </Container>
    </Box>
  );
}

export default memo(Footer);