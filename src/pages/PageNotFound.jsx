import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Inconsolata, monospace",
          textTransform: "uppercase",
          mt: 4,
          mb: 4,
        }}
      >
        404 Not Found
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          alignItems: "center",
          mx: { xs: 3, md: 10 },
          my: 5,
        }}
      >
        <Box>
          <img
            src={"../assets/Scarecrow.png"}
            alt="404 Scarecrow"
            style={{ width: "100%" }}
          />
        </Box>

        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              lineHeight: 1.2,
              fontWeight: "bold",
            }}
          >
            I have bad news for you
          </Typography>
          <Typography
            sx={{
              fontFamily: "Space Mono, monospace",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              lineHeight: 1.7,
              mt: 2,
              maxWidth: "400px",
            }}
          >
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              mt: 5,
              backgroundColor: "#333",
              color: "#fff",
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              textTransform: "uppercase",
              fontFamily: "Space Mono, monospace",
              "&:hover": { backgroundColor: "#444" },
            }}
          >
            Back to Homepage
          </Button>
        </Box>
      </Box>

      
    </Box>
  );
};

export default PageNotFound;
