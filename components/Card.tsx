import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, noPadding = false }) => {
  const baseClasses = 'relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-glass transition-all duration-300 overflow-hidden group';
  
  // Add specific hover effects if it's clickable
  const interactiveClasses = onClick 
    ? 'cursor-pointer hover:bg-white/10 hover:border-white/20 hover:shadow-neon hover:-translate-y-1 active:scale-[0.98]' 
    : '';

  const paddingClass = noPadding ? '' : 'p-5';

  return (
    <div className={`${baseClasses} ${interactiveClasses} ${paddingClass} ${className}`} onClick={onClick}>
      {/* Inner subtle glow for aesthetics */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;