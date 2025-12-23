import apiClient from './client';

interface Alarm {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: number;
}

// Alarm API endpoints
export const alarmApi = {
  /**
   * Fetch all alarms
   */
  getAllAlarms: async (): Promise<Alarm[]> => {
    const response = await apiClient.get('/alarms');
    return response.data;
  },
};
