import React from 'react';

const Loading: React.FC<{ label?: string }> = ({ label = 'Ładowanie...' }) => (
  <div className="flex flex-col items-center justify-center gap-3">
    <div className="relative w-14 h-14">
      <div className="absolute inset-0 rounded-full rotating-ring" />
      <div className="absolute inset-3 rounded-full bg-black/60 flex items-center justify-center">
        <div className="w-5 h-5 rounded-full bg-white/12" />
      </div>
    </div>
    <div className="sr-only">{label}</div>
  </div>
);

export default Loading;
