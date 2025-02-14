import { addTask, updateTask } from "../api/task";

export const handleTaskSubmit = async ({
  title,
  description,
  selectedTask,
  setTitle,
  setDescription,
  setOpen,
  setSelectedTask,
  fetchTasks,
}) => {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (!trimmedTitle || !trimmedDescription) return;

  try {
    if (selectedTask) {
      const updatedFields = {};
      if (trimmedTitle !== selectedTask.title)
        updatedFields.title = trimmedTitle;
      if (trimmedDescription !== selectedTask.description)
        updatedFields.description = trimmedDescription;

      if (Object.keys(updatedFields).length > 0) {
        await updateTask({ taskId: selectedTask._id, ...updatedFields });
      }
    } else {
      await addTask(trimmedTitle, trimmedDescription);
    }

    setTitle("");
    setDescription("");
    setOpen(false);
    setSelectedTask(null);
    fetchTasks();
  } catch (error) {
    console.error("Error submitting task:", error);
  }
};
