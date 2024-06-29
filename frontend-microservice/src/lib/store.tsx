import { configureStore } from '@reduxjs/toolkit'
import ownersReducer from './features/owner/ownerSlice';
import tasksReducer from './features/task/taskSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      owner: ownersReducer,
      task: tasksReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']