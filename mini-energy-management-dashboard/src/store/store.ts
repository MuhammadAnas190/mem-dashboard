import { configureStore } from '@reduxjs/toolkit';
import alarmReducer from './slices/alarmSlice';
import powerReducer from './slices/powerSlice';
import siteReducer from './slices/siteSlice';

export const store = configureStore({
  reducer: {
    alarms: alarmReducer,
    power: powerReducer,
    site: siteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
