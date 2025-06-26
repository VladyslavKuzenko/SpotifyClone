import { useContext } from 'react';
import { APIContext } from '../providers/APIProvider';

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) throw new Error('useAPI must be used within APIProvider');
  return context;
};