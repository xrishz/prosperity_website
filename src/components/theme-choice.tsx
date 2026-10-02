'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { IconMoon, IconSun } from '@tabler/icons-react';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ThemeChoice({ location }: { location: 'desktop' | 'mobile' }) {
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const current = mounted && resolvedTheme === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  const id = `appearance-${location}`;

  return (
    <div className={`theme-choice ${location === 'desktop' ? 'desktop-theme-choice' : 'mobile-theme-choice'}`}>
      <button
        type="button"
        id={id}
        className="icon-button theme-toggle"
        disabled={!mounted}
        aria-label={mounted ? `Switch to ${next} theme (currently ${current})` : 'Change appearance'}
        title={mounted ? `Appearance: ${theme === 'system' ? `System (${current})` : current}. Switch to ${next}.` : 'Appearance'}
        onClick={() => setTheme(next)}
      >
        {current === 'dark' ? <IconMoon size={22} stroke={1.6} aria-hidden="true" /> : <IconSun size={22} stroke={1.6} aria-hidden="true" />}
      </button>
    </div>
  );
}
