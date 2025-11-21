
import React, { useState, useCallback, useMemo } from 'react';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Program from './pages/Program';
import Recipes from './pages/Recipes';
import Settings from './pages/Settings';
import VTPTools from './pages/VTPTools';
import Challenges from './pages/Challenges';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Inicio');

  const handleNavChange = useCallback((page: Page) => {
    setActivePage(page);
  }, []);
  
  const CurrentPage = useMemo(() => {
    switch (activePage) {
      case 'Inicio':
        return <Home setActivePage={setActivePage} />;
      case 'VTP':
        return <VTPTools />;
      case 'Programa':
        return <Program />;
      case 'Recetas':
        return <Recipes />;
      case 'Config':
        return <Settings />;
      case 'Retos':
        return <Challenges />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  }, [activePage]);

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <main className="flex-grow pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="p-4 md:p-6 page-enter" key={activePage}>
            {CurrentPage}
          </div>
        </div>
      </main>
      <BottomNav activePage={activePage} onNavChange={handleNavChange} />
    </div>
  );
};

export default App;
