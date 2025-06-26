import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { useLogger } from "../middleware/LoggerProvider";

const StatisticsPage = () => {
  const [stats, setStats] = useState([]);
  const { log } = useLogger();

  useEffect(() => {
    log("Stats page load");
    const sample = [
      {
        shortcode: "zz123",
        original: "https://site.com",
        created: "2025-06-26 10:00",
        expires: "2025-06-26 10:30",
        clicks: 3,
        clickDetails: [
          { timestamp: "2025-06-26 10:01", source: "social", location: "India" },
          { timestamp: "2025-06-26 10:04", source: "email", location: "US" },
        ]
      }
    ];
    setStats(sample);
  }, []);

  return (
    <Box>
      <Typography variant="h4">Stats View</Typography>
      {stats.map((stat, i) => (
        <Paper key={i} sx={{ p: 2, mt: 2 }}>
          <Typography><strong>Code:</strong> <a href={`/${stat.shortcode}`}>{stat.shortcode}</a></Typography>
          <Typography>Orig: {stat.original}</Typography>
          <Typography>Start: {stat.created}</Typography>
          <Typography>End: {stat.expires}</Typography>
          <Typography>Clicks: {stat.clicks}</Typography>
          <Divider sx={{ my: 1 }} />
          {stat.clickDetails.map((det, j) => (
            <Typography key={j}>
              [{det.timestamp}] via {det.source} - {det.location}
            </Typography>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default StatisticsPage;
