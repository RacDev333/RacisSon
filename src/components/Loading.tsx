import React from 'react';

const Loading: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="w-12 h-12 rounded-full gradient-btn flex items-center justify-center">
      <div className="w-8 h-8 rounded-full bg-white/12 animate-spin" />
    </div>
  </div>
);

export default Loading;
