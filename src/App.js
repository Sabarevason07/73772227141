import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import URLShortener from "./components/URLShortener";
import RedirectHandler from "./components/RedirectHandler";
import { LoggerProvider } from "./middleware/LoggerProvider";
import { Container } from "@mui/material";

const App = () => {
  return (
    <LoggerProvider>
      <Router>
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<URLShortener />} />
            <Route path="/:shortcode" element={<RedirectHandler />} />
          </Routes>
        </Container>
      </Router>
    </LoggerProvider>
  );
};

export default App;
