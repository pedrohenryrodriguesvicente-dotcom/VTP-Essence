
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { Page } from '../types';
import { HomeIcon, SixtyIcon, PlateIcon, CogIcon, VtpIcon } from './Icons';
import { useReminder } from '../contexts/ReminderContext';

interface BottomNavProps {
  activePage: Page;
  onNavChange: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavChange }) => {
  const { isReminderActive, dismissReminder } = useReminder();

  const handleNavClick = (page: Page) => {
    onNavChange(page);
    if (isReminderActive) {
        dismissReminder();
    }
  };
  
  const getIcon = (page: Page) => {
    const className = "h-6 w-6";
    switch (page) {
      case 'Inicio': return <HomeIcon className={className} />;
      case 'VTP': return <VtpIcon className={className} />;
      case 'Programa': return <SixtyIcon className={className} />;
      case 'Recetas': return <PlateIcon className={className} />;
      case 'Config': return <CogIcon className={className} />;
      default: return null;
    }
  };

  const getLabel = (page: Page) => {
      switch (page) {
          case 'Inicio': return 'Inicio';
          case 'VTP': return 'VTP';
          case 'Programa': return 'Plan 60';
          case 'Recetas': return 'Recetas';
          case 'Config': return 'Ajustes';
          default: return '';
      }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 z-50 pointer-events-none">
      <nav className="pointer-events-auto max-w-lg mx-auto bg-surface/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex justify-between items-end px-2 py-2 pb-safe">
        {NAV_ITEMS.map((page) => {
          const isActive = activePage === page;
          return (
            <button
              key={page}
              onClick={() => handleNavClick(page)}
              className="flex-1 flex flex-col items-center justify-center py-1 group focus:outline-none relative transition-all duration-300"
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/10 text-secondary shadow-[0_0_15px_rgba(6,182,212,0.3)] -translate-y-2' : 'text-text-secondary bg-transparent'}`}>
                  {getIcon(page)}
              </div>
              <span className={`text-[10px] font-medium mt-0.5 transition-colors ${isActive ? 'text-white' : 'text-text-muted'}`}>
                  {getLabel(page)}
              </span>
              
              {/* Indicator Dot */}
              {isActive && (
                  <div className="absolute bottom-1 w-1 h-1 bg-secondary rounded-full shadow-[0_0_5px_rgba(6,182,212,1)] animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
