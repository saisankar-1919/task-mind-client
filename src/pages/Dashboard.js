import { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { logoutContext } = useContext(AuthContext);
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
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/api/task",
      { title, description },
      { headers: { Authorization: token } }
    );
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
    <Container>
      <Typography variant="h4">Task Dashboard</Typography>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={addTask}>
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            {task.title}
            <IconButton onClick={() => deleteTask(task._id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          logoutContext();
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
