import { Task } from "@/lib/types";
import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

type TaskItemProps = {
  task: Task;
  onChangeCompleted: (bool: boolean, task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  isEditing?: boolean;
  isDeleting?: boolean;
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onChangeCompleted,
  onEdit,
  onDelete,
  isEditing,
  isDeleting,
}) => {
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeCompleted(event.target.checked, task);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
      elevation={isEditing ? 5 : 1}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox checked={task.isCompleted} onChange={handleCheckChange} />
        <Typography
          variant="body1"
          component="div"
          className="font-mono"
          sx={{
            textDecoration: task.isCompleted ? "line-through" : "unset",
            color: isEditing ? "red" : "inherit",
          }}
        >
          {task.title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isDeleting ? (
          <CircularProgress size={24} />
        ) : isEditing ? (
          <></>
        ) : (
          <>
            <IconButton onClick={() => onEdit(task)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDelete(task)}>
              <Delete />
            </IconButton>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default TaskItem;
