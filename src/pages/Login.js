import { useState, useContext } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  AppBar,
  Toolbar,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { login } from "../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      loginContext(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <AppBar position="static" sx={{ bgcolor: "#4B0082", borderRadius: 2 }}>
        <Toolbar>
          <Typography variant="h5" fontWeight={600} color="white">
            Login
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, width: "100%" }}>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={600}
              color="text.primary"
              textAlign="center"
              mb={2}
            >
              Welcome Back!
            </Typography>

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, bgcolor: "#4B0082", color: "white" }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
