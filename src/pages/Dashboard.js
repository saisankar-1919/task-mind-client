import { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Chip,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { Delete, ExitToApp, Add } from "@mui/icons-material";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import StatusChip from "../components/StatusChip";
import { addTask, getAllTask, updateTask } from "../api/task";

const Dashboard = () => {
  console.log("local storage", localStorage.getItem("token"));

  const [tasks, setTasks] = useState([]);
  console.log("tasks", tasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user, logoutContext } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await getAllTask();
    setTasks(res);
  };

  const openDialog = (task = null) => {
    setSelectedTask(task);
    setTitle(task ? task.title : "");
    setDescription(task ? task.description : "");
    setOpen(true);
  };

  const handleTaskSubmit = async () => {
    if (selectedTask) {
      try {
        const updatedFields = {};
        if (title !== selectedTask.title) updatedFields.title = title;
        if (description !== selectedTask.description)
          updatedFields.description = description;

        if (Object.keys(updatedFields).length > 0) {
          await updateTask({ taskId: selectedTask._id, ...updatedFields });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await addTask(title, description);
      } catch (e) {
        console.log(e);
      }
    }

    setTitle("");
    setDescription("");
    setOpen(false);
    setSelectedTask(null);
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

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#4B0082", color: "white", fontWeight: "bold" }}
          startIcon={<Add />}
          onClick={() => openDialog(null)}
        >
          Add Task
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {selectedTask ? "Edit Task" : "Add a New Task"}
        </DialogTitle>
        <DialogContent>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleTaskSubmit}
            disabled={!title || !description}
            variant="contained"
          >
            {selectedTask ? "Update Task" : "Add Task"}
          </Button>
        </DialogActions>
      </Dialog>

      {tasks?.length > 0 ? (
        <Box>
          <Typography
            variant="h6"
            sx={{ mt: 3, mb: 2, color: "#4B0082", fontWeight: 600 }}
          >
            Your Tasks
          </Typography>

          <Grid container spacing={3}>
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task._id}>
                <Card
                  sx={{
                    height: 220,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 2,
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700} color="#2D3748">
                      {task.title}
                    </Typography>

                    <Tooltip title={task.description} arrow>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          maxHeight: "80px",
                        }}
                      >
                        {task.description}
                      </Typography>
                    </Tooltip>
                  </CardContent>

                  <Stack direction="row" alignItems="center">
                    <StatusChip
                      status={task.completed}
                      onChange={async () =>
                        await updateTask({
                          taskId: task._id,
                          completed: !task.completed,
                        })
                      }
                    />

                    <Box sx={{ flexGrow: 1 }} />

                    <IconButton onClick={() => openDialog(task)}>
                      <ModeEditIcon sx={{ fontSize: 28, color: "#4B0082" }} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteTask(task._id)}
                    >
                      <Delete sx={{ fontSize: 28 }} />
                    </IconButton>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <Typography variant="h6" fontWeight={600} color="text.secondary">
            No Tasks Added
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
