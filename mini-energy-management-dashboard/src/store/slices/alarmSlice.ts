import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AlarmEvent } from '../../api/alarms';

interface AlarmState {
  alarms: AlarmEvent[];
  filteredAlarms: AlarmEvent[];
  favorites: string[];
  loading: boolean;
  error: string | null;
}

const initialState: AlarmState = {
  alarms: [],
  filteredAlarms: [],
  favorites: [],
  loading: false,
  error: null,
};

const alarmSlice = createSlice({
  name: 'alarms',
  initialState,
  reducers: {
    setAlarmsData: (state, action: PayloadAction<AlarmEvent[]>) => {
      state.alarms = action.payload;
    },
    setFilteredAlarms: (state, action: PayloadAction<AlarmEvent[]>) => {
      state.filteredAlarms = action.payload;
    },
    addAlarm: (state, action: PayloadAction<AlarmEvent>) => {
      state.alarms.push(action.payload);
    },
    removeAlarm: (state, action: PayloadAction<string>) => {
      state.alarms = state.alarms.filter(alarm => alarm.id !== action.payload);
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAlarmsData,
  setFilteredAlarms,
  addAlarm,
  removeAlarm,
  addFavorite,
  removeFavorite,
  setLoading,
  setError,
} = alarmSlice.actions;
export default alarmSlice.reducer;
