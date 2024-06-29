import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define a type for the task object
interface Task {
  id: number;
  taskName: string;
  ownerCode: string;
  ownerDto: string;
}

// Define a type for the slice state
export interface TaskState {
  value: Task[]; // Adjusted the type to match the initial state
}

// Define the initial state using that type
const initialState: TaskState = {
  value: [],
};

export const fetchTaskes = createAsyncThunk('task/fetchTaskes', async () => {
  try {
    const response = await axios.get<Task[]>('http://localhost:9191/api/tasks');
    return response.data;
  } catch (error) {
    // Handle fetch error here, you might want to log or handle errors
    throw new Error('Failed to fetch tasks');
  }
});

export const fetchTask = createAsyncThunk('task/fetchTask', async (idTask: number) => {
  try {
    const response = await axios.get<Task>(`http://localhost:9191/api/tasks/${idTask}`);
    return response.data;
  } catch (error) {
    // Handle fetch error here, you might want to log or handle errors
    throw new Error('Failed to fetch tasks');
  }
});

export const addTask = createAsyncThunk('task/addTask', async (newTask: Task) => {
  try {
    const response = await axios.post<Task>('http://localhost:9191/api/tasks', newTask);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add task');
  }
});

export const updateTask = createAsyncThunk('task/updateTask', async (updateTask: Task) => {
  try {
    const response = await axios.put<Task>(`http://localhost:9191/api/tasks/${updateTask.id}`, updateTask);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task');
  }
});

export const deleteTask = createAsyncThunk('task/deleteTask', async (idTask: number) => {
  try {
    await axios.delete<void>(`http://localhost:9191/api/tasks/${idTask}`);
    return idTask;
  } catch (error) {
    throw new Error('Failed to delete task');
  }
});

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    searchTask: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(task => task.taskName.toLowerCase().includes(action.payload.toLowerCase()));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskes.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.value = action.payload;
      })
      .addCase(fetchTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.value = [action.payload];;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.value.push(action.payload);
        toast.success('Task added successfully');
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.value.findIndex(owner => owner.id === action.payload.id);
        if (index !== -1) {
          state.value[index] = action.payload;
        }
        toast.success('Task updated successfully');
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.value = state.value.filter(owner => owner.id !== action.payload);
        toast.success('Task deleted successfully');
      });
  }
});

export const { searchTask } = taskSlice.actions;

export default taskSlice.reducer;
