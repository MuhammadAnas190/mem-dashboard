import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ICurrentPower {
  activePower: number;
  reactivePower: number;
}

interface IChartDataPoint extends ICurrentPower {
  timestamp: number;
}

interface PowerState {
  currentPower: ICurrentPower | null;
  chartData: IChartDataPoint[];
  isPolling: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: PowerState = {
  currentPower: null,
  chartData: [],
  isPolling: false,
  loading: false,
  error: null,
};

const MAX_CHART_DATA_FROM_POLL = 20;

const powerSlice = createSlice({
  name: 'power',
  initialState,
  reducers: {
    setCurrentPower: (state, action: PayloadAction<ICurrentPower>) => {
      state.currentPower = action.payload;
    },
    addChartData: (state, action: PayloadAction<IChartDataPoint[]>) => {
      // Keep only the last 100 data points
      if (state.chartData.length > MAX_CHART_DATA_FROM_POLL) {
        const dataPoints = state.chartData.slice(-MAX_CHART_DATA_FROM_POLL)
        state.chartData = dataPoints.concat(action.payload);
      } else {
          state.chartData = action.payload;
      }
    },
    setIsPolling: (state, action: PayloadAction<boolean>) => {
      state.isPolling = action.payload;
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
  setCurrentPower,
  addChartData,
  setIsPolling,
  setLoading,
  setError,
} = powerSlice.actions;
export default powerSlice.reducer;
