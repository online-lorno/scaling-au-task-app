"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  TextField,
} from "@mui/material";
import {
  useAddTaskMutation,
  useGetTasksQuery,
} from "@/lib/redux/slices/api-slice";
import { setTasks } from "@/lib/redux/slices/tasks-slice";
import { Task } from "@/lib/types";
import TaskItem from "./TaskItem";

import { useAppSelector } from "@/lib/redux/hooks";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [title, setTitle] = useState("");
  const [toEditTask, setToEditTask] = useState<Task>();
  const [toDeleteTask, setToDeleteTask] = useState<Task>();
  const {
    data: dataTasks,
    error: errorTasks,
    isLoading: isLoadingTasks,
  } = useGetTasksQuery(undefined);
  const [
    addTaskMutation,
    { error: errorAddTask, isLoading: isLoadingAddTask },
  ] = useAddTaskMutation();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log();
  };

  const handleToEditTask = (task: Task) => {
    setToEditTask(task);
  };

  const handleToDeleteTask = (task: Task) => {
    setToDeleteTask(task);
  };

  useEffect(() => {
    if (dataTasks) {
      dispatch(setTasks(dataTasks));
    }
  }, [dataTasks, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={2}>
          <Grid size={10}>
            <TextField
              name="title"
              type="text"
              label="Task Title"
              placeholder="Enter task title"
              value={title}
              onChange={handleTitleChange}
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
              disabled={isLoadingTasks || isLoadingAddTask}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {isLoadingTasks && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={48} />
        </Box>
      )}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={handleToEditTask}
          onDelete={handleToDeleteTask}
        />
      ))}
    </Box>
  );
};

export default TaskList;
