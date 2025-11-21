import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { ReminderSettings } from '../types';

interface ReminderContextType {
  isReminderActive: boolean;
  dismissReminder: () => void;
  reminderSettings: ReminderSettings;
  setReminderSettings: React.Dispatch<React.SetStateAction<ReminderSettings>>;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export const ReminderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reminderSettings, setReminderSettings] = useLocalStorage<ReminderSettings>('reminderSettings', { enabled: false, time: '20:00' });
  const [isReminderActive, setIsReminderActive] = useState(false);
  const [lastShownDate, setLastShownDate] = useLocalStorage<string | null>('reminderLastShownDate', null);

  useEffect(() => {
    const checkTime = () => {
      if (!reminderSettings.enabled || isReminderActive) {
        return;
      }

      const now = new Date();
      const today = now.toISOString().split('T')[0];
      
      if (lastShownDate === today) {
        return;
      }

      const [hours, minutes] = reminderSettings.time.split(':');
      
      if (now.getHours() === parseInt(hours) && now.getMinutes() === parseInt(minutes)) {
        setIsReminderActive(true);
        setLastShownDate(today);
      }
    };

    const intervalId = setInterval(checkTime, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [reminderSettings, isReminderActive, lastShownDate, setLastShownDate]);
  
  const dismissReminder = () => {
    setIsReminderActive(false);
  };

  return (
    <ReminderContext.Provider value={{ isReminderActive, dismissReminder, reminderSettings, setReminderSettings }}>
      {children}
    </ReminderContext.Provider>
  );
};

export const useReminder = () => {
  const context = useContext(ReminderContext);
  if (context === undefined) {
    throw new Error('useReminder must be used within a ReminderProvider');
  }
  return context;
};
