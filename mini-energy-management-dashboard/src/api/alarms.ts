import apiClient from './client';

export type Severity = "critical" | "major" | "minor" | "warning" | "info";

export interface AlarmEvent {
  id: string;
  code: string;
  severity: Severity;
  siteName: string;
  description: string;
  startTime: number;
  endTime?: number;
  tags: string[];
}

export interface AlarmResponse {
  count: number;
  events: AlarmEvent[];
}

// Alarm API endpoints
export const alarmApi = {
  /**
   * Fetch all alarms
   */
  getAllAlarms: async (search?: string): Promise<AlarmResponse> => {
    const response = await apiClient.get('/alarms', {
        params: { search },
    });
    return response.data;
  },
};
