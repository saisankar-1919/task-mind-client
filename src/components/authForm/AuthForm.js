import { useState, useContext } from "react";
import { Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { login, register } from "../../api/auth";
import AuthCard from "./FormCard";
import { AuthHeader } from "./AuthHeader";

export const AuthForm = ({ type }) => {
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

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setErrors((prev) => ({ ...prev, api: "" }));
      const res =
        type === "login"
          ? await login({ email, password })
          : await register({ email, password });
      loginContext(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        api:
          err.response?.data?.error ||
          `${
            type === "login" ? "Login" : "Registration"
          } failed. Please try again.`,
      }));
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 5, bgcolor: "#F3F4F6", p: 4, borderRadius: 3 }}
    >
      <AuthHeader type={type} />
      <Box display="flex" justifyContent="center" mt={4}>
        <AuthCard
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          errors={errors}
          handleSubmit={handleSubmit}
          type={type}
        />
      </Box>
    </Container>
  );
};
