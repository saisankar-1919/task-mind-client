import { useEffect, useState, useRef } from "react";
import { Container, Typography, Button, Grid, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { deleteTask, getAllTask, updateTask } from "../api/task";
import { handleTaskSubmit } from "./utils";
import DashboardHeader from "../components/dashboard/Header";
import TaskDialog from "../components/dashboard/TaskDialog";
import TaskCard from "../components/dashboard/TaskCard";
import { NoTasks } from "../components/dashboard/NoTasks";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const isFetching = useRef(false);
  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    fetchTasks();

    return () => controller.abort();
  }, []);

  const fetchTasks = async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      const res = await getAllTask({ signal });
      setTasks(res);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch tasks:", error);
      }
    } finally {
      isFetching.current = false;
    }
  };
  const openDialog = (task = null) => {
    setSelectedTask(task);
    setTitle(task ? task.title : "");
    setDescription(task ? task.description : "");
    setOpen(true);
  };

  const handleSubmit = () => {
    handleTaskSubmit({
      title,
      description,
      selectedTask,
      setTitle,
      setDescription,
      setOpen,
      setSelectedTask,
      fetchTasks,
    });
  };

  const deleteTaskHandler = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 5, bgcolor: "#F3F4F6", p: 4, borderRadius: 3 }}
    >
      <DashboardHeader />

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

      <TaskDialog
        open={open}
        setOpen={setOpen}
        selectedTask={selectedTask}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />

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
                <TaskCard
                  task={task}
                  setTasks={setTasks}
                  updateTask={updateTask}
                  openDialog={openDialog}
                  deleteTaskHandler={deleteTaskHandler}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <NoTasks />
      )}
    </Container>
  );
};

export default Dashboard;
