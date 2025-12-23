import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface MaintenanceTicket {
  id: string;
  siteId: string;
  siteName: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  createdBy: string;
}

interface MaintenanceState {
  tickets: MaintenanceTicket[];
  submitting: boolean;
  lastSubmitted: MaintenanceTicket | null;
  loading: boolean;
  error: string | null;
}

const initialState: MaintenanceState = {
  tickets: [],
  submitting: false,
  lastSubmitted: null,
  loading: false,
  error: null,
};

const maintenanceSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<MaintenanceTicket[]>) => {
      state.tickets = action.payload;
    },
    addTicket: (state, action: PayloadAction<MaintenanceTicket>) => {
      state.tickets.unshift(action.payload); // Add to beginning for latest first
      state.lastSubmitted = action.payload;
    },
    updateTicket: (state, action: PayloadAction<MaintenanceTicket>) => {
      const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    removeTicket: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
    setLastSubmitted: (state, action: PayloadAction<MaintenanceTicket | null>) => {
      state.lastSubmitted = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearLastSubmitted: (state) => {
      state.lastSubmitted = null;
    },
  },
});

export const {
  setTickets,
  addTicket,
  updateTicket,
  removeTicket,
  setSubmitting,
  setLastSubmitted,
  setLoading,
  setError,
  clearLastSubmitted,
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;