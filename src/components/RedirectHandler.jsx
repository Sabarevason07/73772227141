import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { useLogger } from "../middleware/LoggerProvider";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const { log } = useLogger();
  const [error, setError] = useState(null);

  useEffect(() => {
    log("Handling redirect", { shortcode });

    const entry = localStorage.getItem(`short_${shortcode}`);
    if (!entry) {
      setError("Shortcode not found.");
      return;
    }

    const { longUrl, expiry } = JSON.parse(entry);
    const now = Date.now();

    if (now > expiry) {
      setError("This link has expired.");
      return;
    }

    setTimeout(() => {
      log("Redirecting to", { longUrl });
      window.location.href = longUrl;
    }, 1200);
  }, [shortcode, log]);

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mt={4}>
      <CircularProgress />
      <Typography>Redirecting to original URL...</Typography>
    </Box>
  );
};

export default RedirectHandler;
