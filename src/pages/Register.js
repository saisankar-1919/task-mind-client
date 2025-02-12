import { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      console.log("register");
      const res = await register({ email: email, password: password });
      loginContext(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
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
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
};

export default Register;
