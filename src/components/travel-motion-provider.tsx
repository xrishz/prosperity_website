'use client';

import {createContext, useContext, useSyncExternalStore} from 'react';
import {IconPlayerPause, IconPlayerPlay} from '@tabler/icons-react';

const storageKey = 'prosperity-motion';
const changeEvent = 'prosperity-motion-change';
let memoryPreference: string | null = null;
const MotionContext = createContext({motionEnabled: false, reducedMotion: true, toggleMotion: () => {}});

function subscribe(listener: () => void) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const small = window.matchMedia('(max-width: 767px)');
  window.addEventListener(changeEvent, listener);
  window.addEventListener('storage', listener);
  reduce.addEventListener('change', listener);
  small.addEventListener('change', listener);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener('storage', listener);
    reduce.removeEventListener('change', listener);
    small.removeEventListener('change', listener);
  };
}

function motionSnapshot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 767px)').matches) return false;
  let preference = memoryPreference;
  try { preference = window.localStorage.getItem(storageKey) ?? preference; } catch { /* Storage is optional. */ }
  return preference !== 'paused';
}

function reducedSnapshot() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
const motionServerSnapshot = () => false;
const reducedServerSnapshot = () => true;

export function TravelMotionProvider({children}: {children: React.ReactNode}) {
  const motionEnabled = useSyncExternalStore(subscribe, motionSnapshot, motionServerSnapshot);
  const reducedMotion = useSyncExternalStore(subscribe, reducedSnapshot, reducedServerSnapshot);
  function toggleMotion() {
    if (reducedSnapshot()) return;
    memoryPreference = motionSnapshot() ? 'paused' : 'playing';
    try { window.localStorage.setItem(storageKey, memoryPreference); } catch { /* Keep the current preference in memory. */ }
    window.dispatchEvent(new Event(changeEvent));
  }
  return <MotionContext.Provider value={{motionEnabled, reducedMotion, toggleMotion}}>
    <div className="travel-experience" data-motion={motionEnabled ? 'on' : 'off'}>{children}</div>
  </MotionContext.Provider>;
}

export function useTravelMotion() { return useContext(MotionContext); }

export function MotionChoice() {
  const {motionEnabled, reducedMotion, toggleMotion} = useTravelMotion();
  return <button type="button" className="motion-choice" onClick={toggleMotion} disabled={reducedMotion}
    aria-label={reducedMotion ? 'Animations paused by your reduced-motion preference' : motionEnabled ? 'Pause animations' : 'Play animations'}
    title={reducedMotion ? 'Your device preference keeps this experience still.' : undefined}>
    {motionEnabled ? <IconPlayerPause size={17} aria-hidden/> : <IconPlayerPlay size={17} aria-hidden/>}
    {reducedMotion ? 'Motion reduced' : motionEnabled ? 'Pause animations' : 'Play animations'}
  </button>;
}
