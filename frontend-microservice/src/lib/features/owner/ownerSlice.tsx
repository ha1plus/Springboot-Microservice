import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define a type for the owner object
interface Owner {
    id: number;
    ownerCode: string;
    ownerDesc: string;
    ownerName: string;
}

// Define a type for the slice state
export interface OwnerState {
    value: Owner[]; // Adjusted the type to match the initial state
}

// Define the initial state using that type
const initialState: OwnerState = {
    value: [],
};

export const fetchOwners = createAsyncThunk('owner/fetchOwners', async () => {
    try {
        const response = await axios.get<Owner[]>('http://localhost:9191/api/owners');
        return response.data;
    } catch (error) {
        // Handle fetch error here, you might want to log or handle errors
        throw new Error('Failed to fetch owners');
    }
});

export const addOwner = createAsyncThunk('owner/addOwner', async (newOwner: Owner) => {
    try {
        const response = await axios.post<Owner>('http://localhost:9191/api/owners', newOwner);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add owner');
    }
});

export const updateOwner = createAsyncThunk('owner/updateOwner', async (updateOwner: Owner) => {
    try {
        const response = await axios.put<Owner>(`http://localhost:9191/api/owners/${updateOwner.id}`, updateOwner);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update owner');
    }
});

export const deleteOwner = createAsyncThunk('owner/deleteOwner', async (idOwner: number) => {
    try {
        await axios.delete<void>(`http://localhost:9191/api/owners/${idOwner}`);
        return idOwner;
    } catch (error) {
        throw new Error('Failed to delete owner');
    }
});

export const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        searchOwner: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter(owner => owner.ownerName.toLowerCase().includes(action.payload.toLowerCase()));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOwners.fulfilled, (state, action: PayloadAction<Owner[]>) => {
                state.value = action.payload;
            })
            .addCase(addOwner.fulfilled, (state, action: PayloadAction<Owner>) => {
                state.value.push(action.payload);
                toast.success('Owner added successfully');
            })
            .addCase(updateOwner.fulfilled, (state, action: PayloadAction<Owner>) => {
                const index = state.value.findIndex(owner => owner.id === action.payload.id);
                if (index !== -1) {
                    state.value[index] = action.payload;
                }
                toast.success('Owner updated successfully');
            })
            .addCase(deleteOwner.fulfilled, (state, action: PayloadAction<number>) => {
                state.value = state.value.filter(owner => owner.id !== action.payload);
                toast.success('Owner deleted successfully');
            });
    }
});

export const { searchOwner } = ownerSlice.actions;

export default ownerSlice.reducer;
