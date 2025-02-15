import { Box, Typography } from "@mui/material";

export const NoTasks = () => {
  return (
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
  );
};
