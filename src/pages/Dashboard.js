import { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Grid,
  AppBar,
  Toolbar,
  Chip,
  Box,
} from "@mui/material";
import { Delete, ExitToApp } from "@mui/icons-material";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user, logoutContext } = useContext(AuthContext);
  console.log("user", user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/api/task", {
      headers: { Authorization: token },
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim() || !description.trim()) return;
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/api/task",
      { title, description },
      { headers: { Authorization: token } }
    );
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/api/task/${id}`, {
      headers: { Authorization: token },
    });
    fetchTasks();
  };

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 5, bgcolor: "#F3F4F6", p: 4, borderRadius: 3 }}
    >
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
              //label={user.email}
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

      <Card
        sx={{
          p: 3,
          mt: 3,
          mb: 3,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Typography variant="h6" fontWeight={600} color="#4B0082" gutterBottom>
          Add a New Task
        </Typography>
        <TextField
          label="Title*"
          fullWidth
          margin="dense"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description*"
          fullWidth
          margin="dense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          variant="outlined"
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "#4B0082",
              color: "white",
              fontWeight: "bold",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              "&:hover": { bgcolor: "#660099" },
            }}
            disabled={title == "" || description == ""}
            onClick={addTask}
          >
            Add Task
          </Button>
        </Box>
      </Card>

      <Typography
        variant="h6"
        sx={{ mt: 3, mb: 2, color: "#4B0082", fontWeight: 600 }}
      >
        Your Tasks
      </Typography>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card
              sx={{
                position: "relative",
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600} color="#4B0082">
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <IconButton
                  color="error"
                  onClick={() => deleteTask(task._id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(255,0,0,0.1)",
                    borderRadius: "50%",
                    "&:hover": { bgcolor: "rgba(255,0,0,0.2)" },
                  }}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
