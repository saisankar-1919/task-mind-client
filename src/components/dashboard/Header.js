import {
  Typography,
  AppBar,
  Toolbar,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export default function DashboardHeader() {
  const { user, logoutContext } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#4B0082", boxShadow: 2, p: 1, borderRadius: 2 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight={600} color="white">
          Task Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Chip
            label={user.email.split("@")[0]}
            sx={{
              mr: 2,
              fontSize: "1rem",
              fontWeight: 600,
              bgcolor: "#FFD700",
              color: "#4B0082",
            }}
          />
          <IconButton
            sx={{
              bgcolor: "rgba(255, 215, 0, 0.2)",
              color: "#FFD700",
              borderRadius: "50%",
              p: 1.2,
              "&:hover": { bgcolor: "rgba(255, 215, 0, 0.4)" },
            }}
            onClick={() => {
              logoutContext();
              navigate("/login");
            }}
          >
            <ExitToApp fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
