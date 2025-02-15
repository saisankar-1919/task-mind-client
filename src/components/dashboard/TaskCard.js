import {
  Typography,
  Box,
  Tooltip,
  IconButton,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import StatusChip from "./StatusChip";

export default function TaskCard({
  task,
  setTasks,
  updateTask,
  openDialog,
  deleteTaskHandler,
}) {
  return (
    <Card
      sx={{
        height: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: task.completed ? "#ccffdd" : "#ffebcc",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          color="#2D3748"
          sx={{ textTransform: "capitalize" }}
        >
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
          onChange={async () => {
            const updatedStatus = !task.completed;
            setTasks((prevTasks) =>
              prevTasks.map((t) =>
                t._id === task._id ? { ...t, completed: updatedStatus } : t
              )
            );
            await updateTask({
              taskId: task._id,
              completed: updatedStatus,
            });
          }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={() => openDialog(task)}>
          <ModeEditIcon sx={{ fontSize: 28, color: "#4B0082" }} />
        </IconButton>
        <IconButton color="error" onClick={() => deleteTaskHandler(task._id)}>
          <Delete sx={{ fontSize: 28 }} />
        </IconButton>
      </Stack>
    </Card>
  );
}
