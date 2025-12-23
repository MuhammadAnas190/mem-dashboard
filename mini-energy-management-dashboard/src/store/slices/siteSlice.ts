import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type OperatingMode = 'Grid Following' | 'Microgrid' | 'Standalone';

interface SiteInfo {
  name: string;
  location: string;
  currentOperatingMode: OperatingMode;
}

interface EnergyStats {
  dates: string[];
  energy: number[];
  totalEnergy: number;
}

interface SiteState {
  siteInfo: SiteInfo | null;
  mode: OperatingMode;
  energyStats: EnergyStats | null;
//   loading: boolean;
//   error: string | null;
}
const initialState: SiteState = {
  siteInfo: null,
  mode: 'Grid Following',
  energyStats: {
    dates: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07'],
    energy: [120, 132, 101, 134, 90, 230, 210],
    totalEnergy: 0,
  },
//   loading: false,
//   error: null,
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setSite: (state, action: PayloadAction<SiteInfo>) => {
      state.siteInfo = {
        currentOperatingMode: action.payload.currentOperatingMode,
        location: action.payload.location,
        name: action.payload.name,
      }
      state.mode = action.payload.currentOperatingMode;
    //   state.energyStats = {
    //     dates: action.payload.dates,
    //     energy: action.payload.energy,
    //     totalEnergy: action.payload.totalEnergy,
    //   };
      
      
    },
    // setSiteLoading: (state, action: PayloadAction<boolean>) => {
    //   state.loading = action.payload;
    // },
    // setSiteError: (state, action: PayloadAction<string | null>) => {
    //   state.error = action.payload;
    // },
  },
});

export const {
  setSite,
//   setSiteLoading,
//   setSiteError,
} = siteSlice.actions;

export default siteSlice.reducer;