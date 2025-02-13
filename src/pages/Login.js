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
    <Container
      maxWidth="sm"
      sx={{ mt: 5, bgcolor: "#F3F4F6", p: 4, borderRadius: 3 }}
    >
      <AppBar position="static" sx={{ bgcolor: "#4B0082", borderRadius: 2 }}>
        <Toolbar>
          <Typography variant="h5" fontWeight={600} color="white">
            Welcome back!
          </Typography>
        </Toolbar>
      </AppBar>

      <Box display="flex" justifyContent="center" mt={4}>
        <Card sx={{ width: "100%", p: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
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
