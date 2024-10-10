import { Task } from "@/lib/types";
import { Box, Checkbox, Typography, IconButton, Paper } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

type TaskItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox checked={task.isCompleted} />
        <Typography
          variant="body1"
          component="div"
          className="font-mono"
          sx={{
            textDecoration: !task.isCompleted ? "line-through" : "unset",
          }}
        >
          {task.title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => onEdit(task)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(task)}>
          <Delete />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default TaskItem;
