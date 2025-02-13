import { useState, useContext } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  AppBar,
  Toolbar,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError(null);
      const res = await register({ email, password });
      loginContext(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration failed", err);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 5, bgcolor: "#F3F4F6", p: 4, borderRadius: 3 }}
    >
      <AppBar
        position="static"
        sx={{ bgcolor: "#4B0082", boxShadow: 2, p: 1, borderRadius: 2 }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            fontWeight={600}
            color="white"
            sx={{ mx: "auto" }}
          >
            Register
          </Typography>
        </Toolbar>
      </AppBar>
      <Box display="flex" justifyContent="center" mt={4}>
        <Card sx={{ width: "100%", p: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            {error && <Alert severity="error">{error}</Alert>}
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
              sx={{
                mt: 2,
                bgcolor: "#4B0082",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={handleRegister}
            >
              Register
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
