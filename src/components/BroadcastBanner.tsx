import React, { useEffect, useRef, useState } from 'react';
import { fetchSheetAsJson } from '../services/googleSheets';

const SPREADSHEET_ID = '1KlaZ-qTVVbK0bMzHxPejQjH8j4hCRB-L3saXCaM5MwY';

function findBroadcastKey(row: Record<string, any> | undefined) {
  if (!row) return undefined;
  return Object.keys(row).find(k => (k ?? '').toString().toLowerCase() === 'broadcast');
}

export default function BroadcastBanner() {
  const [messages, setMessages] = useState<string[]>([]);
  const [repeats, setRepeats] = useState(1);
  const [duration, setDuration] = useState(20);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const rows = await fetchSheetAsJson(SPREADSHEET_ID);
        const key = findBroadcastKey(rows[0]);
        const rawTexts: string[] = [];
        if (key) {
          rows.forEach((r: any) => {
            const v = r[key];
            if (v || v === 0) rawTexts.push(String(v));
          });
        } else {
          // fallback: try any column named like message or note
          rows.forEach((r: any) => {
            Object.values(r).forEach(val => { if (val) rawTexts.push(String(val)); });
          });
        }

        // split by common delimiters: pipe, newline, double-semicolon, semicolon
        const parts = rawTexts
          .flatMap(t => t.split(/\r?\n|\||;;|;/))
          .map(s => s.trim())
          .filter(Boolean);

        const uniq = Array.from(new Set(parts));
        if (mounted && uniq.length) setMessages(uniq);
      } catch (err) {
        console.error('BroadcastBanner load error', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // measure widths and compute repeats/duration
  useEffect(() => {
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
  }, [messages]);

  const renderSet = (keyPrefix = '') => (
    <div className="marquee-set whitespace-nowrap" aria-hidden>
      {Array.from({ length: repeats }).flatMap((_, i) => (
        messages.map((m, idx) => (
          <React.Fragment key={`${keyPrefix}-${i}-${idx}`}>
            <span className="inline-block px-4 py-2 text-sm lg:text-base font-medium opacity-95">
              {m}
            </span>
            <span className="inline-block px-2 text-sm text-muted sep">•</span>
          </React.Fragment>
        ))
      ))}
    </div>
  );

  // If there are no broadcast messages, don't render the banner at all
  if (!messages || messages.length === 0) return null;

  return (
    <div className="broadcast-banner w-full">
      <div className="broadcast-inner" ref={containerRef}>
        {/* measurement set - hidden offscreen */}
        <div className="measure" ref={measureRef}>
          {messages.map((m, i) => (
            <React.Fragment key={`m-${i}`}>
              <span className="inline-block px-4 py-2 text-sm lg:text-base font-medium">{m}</span>
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
