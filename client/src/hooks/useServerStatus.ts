import { useState, useEffect } from 'react';
import { checkServerStatus, ServerStatus } from '../api/serverApi';

const POLLING_INTERVAL = 30000; 

export const useServerStatus = () => {
  const [status, setStatus] = useState<ServerStatus>({
    status: 'cold',
    timestamp: new Date().toISOString(),
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const newStatus = await checkServerStatus();
        setStatus(newStatus);
        setError(null);
      } catch (err) {
        setError('Failed to check server status');
        setStatus(prev => ({ ...prev, status: 'cold' }));
      }
    };

    // Initial check
    checkStatus();

    // Set up polling
    const interval = setInterval(checkStatus, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { status: status.status, timestamp: status.timestamp, error };
};