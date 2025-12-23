import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Space } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { PowerWaveformChart } from '../../component/PowerWaveformChart';
import { usePolling } from '../../hooks/usePolling';
import { powerApi } from '../../api/power';
import {
  addChartData,
  setCurrentPower,
  setLoading,
  setError,
  setIsPolling,
} from '../../store/slices/powerSlice';
import type { RootState } from '../../store/store';

const POLLING_INTERVAL = 60000; // 60 seconds
const DATA_POINTS = 20;

const LivePage = () => {
  const dispatch = useDispatch();
  const { chartData, currentPower, loading } = useSelector(
    (state: RootState) => state.power
  );

  const fetchPowerData = useCallback(async (points?: number) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await powerApi.getLiveData(points || DATA_POINTS);

      // Set chart data with the fetched points
      dispatch(addChartData(response.points));

      // Set current power from the latest data point
      if (response.points.length > 0) {
        const latestPoint = response.points[response.points.length - 1];
        dispatch(setCurrentPower({
          activePower: latestPoint.activePower,
          reactivePower: latestPoint.reactivePower,
        }));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch power data';
      dispatch(setError(errorMessage));
      throw error; // Re-throw to let the polling hook handle it
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const { startPolling, stopPolling, isPolling, contextHolder } = usePolling(
    fetchPowerData,
    POLLING_INTERVAL
  );

  const handleStartPolling = useCallback(async () => {
    dispatch(setIsPolling(true));
    await startPolling(100);
  }, [dispatch, startPolling]);

  const handleStopPolling = useCallback(() => {
    dispatch(setIsPolling(false));
    stopPolling();
  }, [dispatch, stopPolling]);

  return (
    <>
      {contextHolder}
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={handleStartPolling}
            disabled={isPolling}
            loading={loading}
          >
            Start Polling
          </Button>
          <Button
            danger
            icon={<PauseCircleOutlined />}
            onClick={handleStopPolling}
            disabled={!isPolling}
          >
            Stop Polling
          </Button>
          <span style={{ color: '#999', fontSize: '12px' }}>
            {isPolling ? '🟢 Polling Active' : '⚪ Polling Inactive'} | Interval: 60s
          </span>
        </Space>
      </div>

      <div style={{ width: '100%' }}>
        <PowerWaveformChart
          chartData={chartData}
          currentPower={currentPower}
          loading={loading}
        />
      </div>
    </>
  );
};

export default LivePage;