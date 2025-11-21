import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'completed' | 'outline' | 'snake';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', variant = 'primary' }) => {
  const baseClasses = 'relative group transition-all duration-300 py-3 px-6 rounded-xl font-bold text-sm tracking-wide text-center focus:outline-none active:scale-95 flex justify-center items-center';

  const variantClasses = {
    // Pulse for primary
    primary: 'bg-neon-gradient text-white shadow-neon hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] border border-transparent animate-pulse-slow overflow-hidden',
    // Normal secondary
    secondary: 'bg-surface border border-white/10 text-text-primary hover:bg-white/10 hover:border-white/20 shadow-glass overflow-hidden',
    // Completed state
    completed: 'bg-success/20 text-success border border-success/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] overflow-hidden',
    // Simple outline
    outline: 'bg-transparent border border-primary/50 text-primary hover:bg-primary/10 overflow-hidden',
    // SNAKE BORDER EFFECT (No pulse, just running light)
    snake: 'snake-border text-white shadow-glass hover:shadow-neon',
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      
      {/* Shine Effect on Hover for Primary */}
      {variant === 'primary' && (
         <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      )}
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </button>
  );
};

export default Button;