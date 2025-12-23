import apiClient from './client';

interface ICurrentPower {
  activePower: number;
  reactivePower: number;
}

interface IChartDataPoint extends ICurrentPower {
  timestamp: number;
}

interface PowerLiveResponse {
  count: number;
  points: IChartDataPoint[];
}

// Power API endpoints
export const powerApi = {
  /**
   * Get live power data with specified number of points
   */
  getLiveData: async (points: number = 100): Promise<PowerLiveResponse> => {
    const response = await apiClient.get('/live', {
      params: { points },
    });
    return response.data;
  },
};
