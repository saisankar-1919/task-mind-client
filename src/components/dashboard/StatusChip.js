import { Chip, Checkbox, Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const StatusChip = ({ status, onChange }) => {
  return (
    <Chip
      label={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: "15px" }}>Completed</Typography>
          <Checkbox
            checked={status}
            onChange={onChange}
            icon={<RadioButtonUncheckedIcon sx={{ color: "#757575" }} />}
            checkedIcon={<CheckCircleIcon sx={{ color: "#388E3C" }} />}
            sx={{ p: 0 }}
          />
        </Box>
      }
      sx={{
        backgroundColor: status === "completed" ? "#DFF6DD" : "#E0E0E0",
        color: status === "completed" ? "#388E3C" : "#757575",
        fontWeight: 500,
        borderRadius: "20px",
        padding: "4px 12px",
        display: "flex",
        alignItems: "center",
      }}
    />
  );
};

export default StatusChip;
