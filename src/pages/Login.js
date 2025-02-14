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
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { login } from "../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", api: "" });
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = { email: "", password: "", api: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const res = await login({ email, password });
      loginContext(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.log("error", err.response.data.error);
      setErrors((prev) => ({
        ...prev,
        api: err.response.data.error || "Login failed. Please try again.",
      }));
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
            {errors.api && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.api}
              </Alert>
            )}

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
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
