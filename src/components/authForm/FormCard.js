import {
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Typography,
  Link,
} from "@mui/material";

const AuthCard = ({
  email,
  setEmail,
  password,
  setPassword,
  errors,
  handleSubmit,
  type,
}) => {
  return (
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
          onClick={handleSubmit}
        >
          {type === "login" ? "Login" : "Continue"}
        </Button>
        <Typography sx={{ mt: 1 }}>
          {type === "login" ? (
            <>
              You don't have an account?<Link href="/register">Register</Link>
            </>
          ) : (
            <>
              Already have an account?<Link href="/login">Login</Link>
            </>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AuthCard;
