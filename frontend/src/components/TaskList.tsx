"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "@/lib/redux/slices/api-slice";
import {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
} from "@/lib/redux/slices/tasks-slice";
import { Task } from "@/lib/types";
import TaskItem from "./TaskItem";
import { useAppSelector } from "@/lib/redux/hooks";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [title, setTitle] = useState("");
  const [toEditTask, setToEditTask] = useState<Task>();
  const [toDeleteTask, setToDeleteTask] = useState<Task>();
  const { data: dataTasks, isLoading: isLoadingTasks } =
    useGetTasksQuery(undefined);
  const [addTaskMutation, { isLoading: isLoadingAddTask }] =
    useAddTaskMutation();
  const [updateTaskMutation, { isLoading: isLoadingUpdateTask }] =
    useUpdateTaskMutation();
  const [deleteTaskMutation, { isLoading: isLoadingDeleteTask }] =
    useDeleteTaskMutation();

  const handleCloseSnackBar = (
    _?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (toEditTask) {
        const result = await updateTaskMutation({
          id: toEditTask.id,
          params: {
            title,
          },
        });
        if (result?.data) {
          dispatch(updateTask(result.data));
        }
      } else {
        const result = await addTaskMutation({ title }).unwrap();
        dispatch(addTask(result));
      }

      setTitle("");
    } catch (error) {
      console.error(error);
      setErrorText("There was an error adding the task");
      setOpenSnackBar(true);
    } finally {
      setToEditTask(undefined);
    }
  };

  const handleChangeCompleted = async (bool: boolean, task: Task) => {
    try {
      const result = await updateTaskMutation({
        id: task.id,
        params: {
          isCompleted: bool,
        },
      });
      if (result?.data) {
        dispatch(updateTask(result.data));
      }
    } catch (error) {
      console.error(error);
      setErrorText("There was an error updating the task");
      setOpenSnackBar(true);
    }
  };

  const handleEditTask = (task: Task) => {
    setToEditTask(task);
    setTitle(task.title);
  };

  const handleDeleteTask = async (task: Task) => {
    setToDeleteTask(task);

    try {
      const result = await deleteTaskMutation(task.id);
      if (result?.data) {
        dispatch(deleteTask(result.data.id));
      }
    } catch (error) {
      console.error(error);
      setErrorText("There was an error deleting the task");
      setOpenSnackBar(true);
    } finally {
      setToDeleteTask(undefined);
    }
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
      <TaskForm
        title={title}
        onChange={handleTitleChange}
        onSubmit={handleSubmit}
        isLoading={isLoadingTasks || isLoadingAddTask || isLoadingUpdateTask}
        isEditing={!!toEditTask}
      />
      {isLoadingTasks && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={48} />
        </Box>
      )}
      {!isLoadingTasks && !tasks.length && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" className="font-mono">
            No tasks available
          </Typography>
        </Box>
      )}
      {!isLoadingTasks &&
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onChangeCompleted={handleChangeCompleted}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            isEditing={toEditTask?.id === task.id}
            isDeleting={toDeleteTask?.id === task.id && isLoadingDeleteTask}
          />
        ))}
      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorText}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskList;
