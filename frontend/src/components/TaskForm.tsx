import { Grid2 as Grid, TextField, Button } from "@mui/material";
import React from "react";

type TaskFormProps = {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isEditing?: boolean;
};

const TaskForm: React.FC<TaskFormProps> = ({
  title,
  onChange,
  onSubmit,
  isLoading,
  isEditing,
}) => {
  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <Grid container spacing={2}>
        <Grid size={10}>
          <TextField
            name="title"
            type="text"
            label="Task Title"
            placeholder="Enter task title"
            value={title}
            onChange={onChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={2}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ height: "56px" }}
            disabled={isLoading}
          >
            {isEditing ? "Update" : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;
