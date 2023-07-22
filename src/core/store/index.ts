import { configureStore } from '@reduxjs/toolkit';
import entitiesSlice from './slices/entitiesSlice';

export const store = configureStore({
  reducer: {
    entities: entitiesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;