import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

export default function TaskDialog({
  open,
  setOpen,
  selectedTask,
  title,
  setTitle,
  description,
  setDescription,
  handleSubmit,
}) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{selectedTask ? "Edit Task" : "Add a New Task"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title*"
          fullWidth
          margin="dense"
          value={title}
          onChange={(e) => setTitle(e.target.value.trimStart())}
        />
        <TextField
          label="Description*"
          fullWidth
          margin="dense"
          value={description}
          onChange={(e) => setDescription(e.target.value.trimStart())}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={!title.trim() || !description.trim()}
          variant="contained"
        >
          {selectedTask ? "Update Task" : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
