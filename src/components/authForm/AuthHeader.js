import { Typography, AppBar, Toolbar } from "@mui/material";

export const AuthHeader = ({ type }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#4B0082", borderRadius: 2 }}>
      <Toolbar>
        <Typography variant="h5" fontWeight={600} color="white">
          {type === "login" ? "Welcome back!" : "Register"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
