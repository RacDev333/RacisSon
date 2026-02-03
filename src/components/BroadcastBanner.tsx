import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllData } from '../services/productsApi';
import type { Broadcast } from '../services/productsApi';

export default function BroadcastBanner() {
  const navigate = useNavigate();
  const { data: allData } = useAllData();
  const broadcasts = allData?.broadcasts || [];
  const [repeats, setRepeats] = useState(1);
  const [duration, setDuration] = useState(20);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  // measure widths and compute repeats/duration
  React.useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;
      const setWidth = measure.offsetWidth;
      const containerWidth = container.offsetWidth;
      if (!setWidth || !containerWidth) return;
      const times = Math.max(1, Math.ceil(containerWidth / setWidth) + 1);
      setRepeats(times);
      // compute duration so speed ~ 80px/sec
      const speed = 40; // px per second
      const totalDistance = setWidth * times; // duplicated track halves distance
      const dur = Math.max(8, Math.round((totalDistance / speed) * 10) / 10);
      setDuration(dur);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [broadcasts]);

  const renderSet = (keyPrefix = '') => (
    <div className="marquee-set whitespace-nowrap" aria-hidden>
      {Array.from({ length: repeats }).flatMap((_, i) => (
        broadcasts.map((broadcast, idx) => (
          <React.Fragment key={`${keyPrefix}-${i}-${idx}`}>
            {broadcast.link ? (
              <button 
                onClick={() => {
                  if (broadcast.link && broadcast.link.startsWith('/')) {
                    navigate(broadcast.link);
                  } else if (broadcast.link) {
                    window.open(broadcast.link, '_blank', 'noopener,noreferrer');
                  }
                }}
                className="inline-block px-4 py-2 text-sm lg:text-base font-medium opacity-95 hover:text-white hover:opacity-100 transition-colors bg-none border-none cursor-pointer text-inherit"
              >
                {broadcast.text}
              </button>
            ) : (
              <span className="inline-block px-4 py-2 text-sm lg:text-base font-medium opacity-95">
                {broadcast.text}
              </span>
            )}
            <span className="inline-block px-2 text-sm text-muted sep">•</span>
          </React.Fragment>
        ))
      ))}
    </div>
  );

  // If there are no broadcast messages, don't render the banner at all
  if (!broadcasts || broadcasts.length === 0) return null;

  return (
    <div className="broadcast-banner w-full">
      <div className="broadcast-inner" ref={containerRef}>
        {/* measurement set - hidden offscreen */}
        <div className="measure" ref={measureRef}>
          {broadcasts.map((broadcast, i) => (
            <React.Fragment key={`m-${i}`}>
              <span className="inline-block px-4 py-2 text-sm lg:text-base font-medium">{broadcast.text}</span>
              <span className="inline-block px-2 text-sm text-muted sep">•</span>
            </React.Fragment>
          ))}
        </div>

        {/* animated track: duplicate two identical sets for seamless loop */}
        <div className="marquee-track" style={{ animationDuration: `${duration}s` }}>
          {renderSet('a')}
          {renderSet('b')}
        </div>
      </div>
    </div>
  );
}
