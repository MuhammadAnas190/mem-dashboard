import { useRef, useCallback, useEffect, useState } from 'react';
import { message } from 'antd';

/**
 * Generic polling hook that manages setInterval and teardown logic
 * @param apiFn - The API function to call during polling
 * @param interval - Polling interval in milliseconds
 * @returns Object with startPolling, stopPolling, and isPolling state
 */
export const usePolling = (apiFn: (points?: number) => Promise<any>, interval: number = 60000) => {
  const pollingIntervalRef = useRef<any>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const startPolling = useCallback(async (points: number) => {
    if (isPolling) {
      messageApi.info('Polling is already running');
      return;
    }

    try {
      setIsPolling(true);
      messageApi.success('Polling started');

      // Execute immediately on start
      await apiFn(points);

      // Set up interval for subsequent calls
      pollingIntervalRef.current = setInterval(async () => {
        try {
          await apiFn();
        } catch (error) {
          console.error('Polling error:', error);
          // Don't stop polling on individual errors, just log them
        }
      }, interval);
    } catch (error) {
      console.error('Failed to start polling:', error);
      setIsPolling(false);
      messageApi.error('Failed to start polling');
    }
  }, [apiFn, interval, isPolling, messageApi]);

  const stopPolling = useCallback(() => {
    if (!isPolling) {
      messageApi.info('Polling is not running');
      return;
    }

    // Clear the interval immediately
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    setIsPolling(false);
    messageApi.success('Polling stopped');
  }, [isPolling, messageApi]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, []);

  return {
    startPolling,
    stopPolling,
    isPolling,
    contextHolder,
  };
};
