
import { Component } from "react";
import { Alert, Box, Button } from "@mui/material";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Application rendering error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4 }}>
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                onClick={() => window.location.reload()}
              >
                Reload
              </Button>
            }
          >
            Something went wrong while rendering this page.
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}