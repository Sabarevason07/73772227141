import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  IconButton,
  Paper,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useLogger } from "../middleware/LoggerProvider";

const URLForm = ({ idx, data, handleChange, handleRemove }) => (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      mb: 3,
      backgroundColor: "#f9f9f9",
      borderRadius: 2,
      position: "relative",
    }}
  >
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
      <Typography variant="subtitle1" fontWeight={600}>
        🔗 Entry #{idx + 1}
      </Typography>
      <IconButton
        aria-label="delete"
        size="small"
        color="error"
        onClick={() => handleRemove(idx)}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <Delete />
      </IconButton>
    </Box>

    <TextField
      label="Original URL"
      name="longUrl"
      fullWidth
      margin="dense"
      value={data.longUrl}
      onChange={(e) => handleChange(idx, e)}
    />
    <TextField
      label="Validity (minutes)"
      name="validity"
      type="number"
      fullWidth
      margin="dense"
      value={data.validity}
      onChange={(e) => handleChange(idx, e)}
    />
    <TextField
      label="Custom Short Code"
      name="shortcode"
      fullWidth
      margin="dense"
      value={data.shortcode}
      onChange={(e) => handleChange(idx, e)}
    />
  </Paper>
);

const URLShortener = () => {
  const [forms, setForms] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [output, setOutput] = useState([]);
  const [err, setErr] = useState(null);
  const { log } = useLogger();

  const handleChange = (i, e) => {
    const copy = [...forms];
    copy[i][e.target.name] = e.target.value;
    setForms(copy);
  };

  const handleAdd = () => {
    setForms([...forms, { longUrl: "", validity: "", shortcode: "" }]);
  };

  const handleRemove = (index) => {
    const copy = [...forms];
    copy.splice(index, 1);
    setForms(copy);
  };

  const validateURL = (link) => {
    try {
      new URL(link);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    const filtered = forms
      .filter((f) => f.longUrl.trim() !== "")
      .map((f, idx) => ({
        longUrl: f.longUrl,
        validity: f.validity ? parseInt(f.validity) : 30,
        shortcode: f.shortcode || `code${idx}`
      }));

    const anyInvalid = filtered.some((item) => !validateURL(item.longUrl));
    if (anyInvalid) {
      setErr("Some URLs are invalid. Please check.");
      return;
    }

    log("Sending shorten request", { count: filtered.length });

    const now = Date.now();
    const mapping = {};
    filtered.forEach((entry) => {
      const expiryTime = now + entry.validity * 60000;
      localStorage.setItem(
        `short_${entry.shortcode}`,
        JSON.stringify({ longUrl: entry.longUrl, expiry: expiryTime })
      );
      mapping[entry.shortcode] = {
        shortUrl: `http://localhost:3000/${entry.shortcode}`,
        expiry: new Date(expiryTime).toLocaleString()
      };
    });

    setOutput(filtered.map((f) => mapping[f.shortcode]));
    setErr(null);
    log("Shorten success", { mapping });
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        mx: "auto",
        p: 3,
        mt: 4,
        backgroundColor: "#ffffff",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={2}>
        🚀 URL Shortener
      </Typography>

      {err && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {err}
        </Alert>
      )}

      {forms.map((form, idx) => (
        <URLForm
          key={idx}
          idx={idx}
          data={form}
          handleChange={handleChange}
          handleRemove={handleRemove}
        />
      ))}

      <Button
        startIcon={<Add />}
        variant="outlined"
        onClick={handleAdd}
        sx={{ mt: 1, mb: 3 }}
      >
        Add Another URL
      </Button>

      <Button
        variant="contained"
        fullWidth
        size="large"
        sx={{
          backgroundColor: "#1976d2",
          textTransform: "none",
          fontWeight: "bold",
          py: 1.2,
        }}
        onClick={handleSubmit}
      >
        🔧 Shorten URLs
      </Button>

      {output.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" fontWeight={600} mb={2}>
            📋 Results
          </Typography>
          {output.map((res, ix) => (
            <Box
              key={ix}
              sx={{
                backgroundColor: "#e3f2fd",
                p: 2,
                mb: 2,
                borderRadius: 2,
              }}
            >
              <Typography sx={{ wordBreak: "break-all" }}>
                <strong>{forms[ix].longUrl}</strong>
              </Typography>
              <Typography>
                ➡️{" "}
                <a
                  href={res.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: "bold", color: "#1565c0" }}
                >
                  {res.shortUrl}
                </a>{" "}
                (valid till {res.expiry})
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default URLShortener;
