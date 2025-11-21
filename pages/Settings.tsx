
import React, { useRef, useState } from 'react';
import Card from '../components/Card';
import { useReminder } from '../contexts/ReminderContext';
import { CloudArrowDownIcon, CloudArrowUpIcon, CogIcon } from '../components/Icons';

const Settings: React.FC = () => {
  const { reminderSettings, setReminderSettings } = useReminder();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showHelp, setShowHelp] = useState(false);

  // --- REMINDER LOGIC ---
  const handleReminderToggle = () => {
    setReminderSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReminderSettings(prev => ({ ...prev, time: e.target.value }));
  };

  // --- BACKUP LOGIC ---
  const handleExportData = () => {
    const data = { ...localStorage };
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `vtp_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
      fileInputRef.current?.click();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
          try {
              const json = JSON.parse(event.target?.result as string);
              if (confirm("Esto sobrescribirá tus datos actuales. ¿Estás seguro?")) {
                  Object.keys(json).forEach(key => {
                      localStorage.setItem(key, json[key]);
                  });
                  alert("Datos importados con éxito. La página se recargará.");
                  window.location.reload();
              }
          } catch (err) {
              alert("Error al importar el archivo. Formato inválido.");
          }
      };
      reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
          <div className="bg-surface p-2 rounded-full border border-white/10">
              <CogIcon className="w-6 h-6 text-text-secondary" />
          </div>
          <h1 className="text-3xl font-bold font-display text-white">Ajustes</h1>
      </div>
      
      {/* 1. SECCIÓN DATOS (BACKUP) */}
      <section className="space-y-3">
          <h2 className="text-xs font-bold text-accent uppercase tracking-widest ml-1">Tus Datos</h2>
          <Card className="border-white/10">
              <div className="grid grid-cols-2 gap-3">
                  <button onClick={handleExportData} className="flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all active:scale-95">
                      <CloudArrowDownIcon className="w-5 h-5 text-secondary" />
                      <span className="text-xs font-bold text-white">Exportar</span>
                  </button>
                  <button onClick={handleImportClick} className="flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all active:scale-95">
                      <CloudArrowUpIcon className="w-5 h-5 text-accent" />
                      <span className="text-xs font-bold text-white">Importar</span>
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleImportData} />
              </div>
              
              {/* Simple Guide */}
              <div className="mt-4 bg-black/20 rounded-lg p-3 border border-white/5">
                <button 
                  onClick={() => setShowHelp(!showHelp)} 
                  className="flex justify-between items-center w-full text-[10px] uppercase font-bold text-text-secondary"
                >
                  <span>¿Cómo guardar mi progreso?</span>
                  <span>{showHelp ? '▲' : '▼'}</span>
                </button>
                {showHelp && (
                  <div className="mt-2 text-xs text-gray-400 space-y-2 leading-relaxed animate-fade-in">
                    <p>1. Pulsa <b>Exportar</b> para descargar un archivo seguro en tu móvil. Guárdalo en tu carpeta de Archivos o Google Drive.</p>
                    <p>2. Si cambias de móvil o borras la app, instala la app de nuevo y pulsa <b>Importar</b>. Selecciona ese archivo y recuperarás todo.</p>
                  </div>
                )}
              </div>
          </Card>
      </section>

      {/* 2. AJUSTES (REMINDER) */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Notificaciones</h2>
        <Card className="p-4 flex items-center justify-between border-white/10">
            <div>
                <h3 className="text-sm font-bold text-white">Recordatorio Diario</h3>
                <p className="text-xs text-text-secondary mt-0.5">Avisa para registrar tu día.</p>
                {reminderSettings.enabled && (
                    <input
                      type="time"
                      value={reminderSettings.time}
                      onChange={handleTimeChange}
                      className="mt-2 bg-black/20 border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-accent"
                    />
                )}
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                <input type="checkbox" checked={reminderSettings.enabled} onChange={handleReminderToggle} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent shadow-neon"></div>
            </label>
        </Card>
      </section>

      <div className="mt-8 text-center">
          <p className="text-[10px] text-text-muted">VTP Essence v5.0 &bull; Gold Master</p>
      </div>
    </div>
  );
};

export default Settings;
