import { useContext } from 'react';
import { AudioContext } from '../providers/AudioProvider';

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};