import { useState, useEffect } from 'react';
import { ServerCrash, Server } from 'lucide-react';

const ServerStatus = () => {
  const [status, setStatus] = useState<'warming' | 'warm' | 'cold'>('cold');
  const [loadingMessage, setLoadingMessage] = useState('The CPU is warming up');

  useEffect(() => {
    const checkStatus = async () => {
      setStatus('warming');
      setLoadingMessage('The CPU is warming up...');
      
      try {
        const response = await fetch("https://career-advisor-assistan.onrender.com/status");
        const data = await response.json();

        if (data.status === 'active') {
          setStatus('warm');
        } else {
          setStatus('cold'); // Server is inactive
        }
      } catch (error) {
        console.error('Error fetching server status:', error);
        setStatus('cold');
      }
    };

    checkStatus();
  }, []);

  return (
    <div className={`flex items-center space-x-2 ${status === 'warm' ? 'text-green-500' : status === 'warming' ? 'text-yellow-500' : 'text-red-500'}`}>
      {status === 'warm' ? (
        <Server className="h-5 w-5" />
      ) : status === 'warming' ? (
        <div className="animate-spin h-5 w-5 border-4 border-t-4 border-yellow-500 border-solid rounded-full" />
      ) : (
        <ServerCrash className="h-5 w-5" />
      )}
      <span className="text-sm font-medium">
        {status === 'warm' ? 'Server Active' : status === 'warming' ? loadingMessage : 'Server Inactive'}
      </span>
    </div>
  );
};

export default ServerStatus;
