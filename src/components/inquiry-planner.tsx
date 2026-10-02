'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { IconArrowUpRight, IconBrandMessenger, IconBrandWhatsapp, IconCheck, IconCopy, IconMail, IconPhone, IconRefresh, IconTrash } from '@tabler/icons-react';
import { agency, destinations } from '@/lib/content';
import './inquiry.css';

const storageKey = 'prosperity-inquiry-draft-v1';
const validMonth = (value: string) => value === '' || /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
const validTravelers = (value: string) => value === '' || (/^\d{1,3}$/.test(value) && Number(value) >= 1 && Number(value) <= 100);
const validDestination = (value: unknown): value is string => typeof value === 'string' && (value === '' || destinations.some((destination) => destination.slug === value));

function monthLabel(value: string) {
  if (!value || !validMonth(value)) return '';
  const [year, month] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-PH', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function InquiryPlanner({ initialDestination = '' }: { initialDestination?: string }) {
  const [destination, setDestination] = useState(validDestination(initialDestination) ? initialDestination : '');
  const [month, setMonth] = useState('');
  const [travelers, setTravelers] = useState('');
  const [editedDraft, setEditedDraft] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const destinationName = destinations.find((item) => item.slug === destination)?.name;
  const monthError = !validMonth(month) ? 'Choose a valid travel month, or leave it blank.' : '';
  const travelersError = !validTravelers(travelers) ? 'Enter a whole number from 1 to 100, or leave it blank.' : '';
  const fieldsValid = !monthError && !travelersError;
  const generatedDraft = [
    'Hello Prosperity! I would like help planning a trip.',
    destinationName ? `Destination: ${destinationName}` : 'Destination: Still exploring',
    month && validMonth(month) ? `Travel month: ${monthLabel(month)}` : '',
    travelers && validTravelers(travelers) ? `Travelers: ${Number(travelers)}` : '',
    'Could you share the available travel arrangements and next steps? Thank you!',
  ].filter(Boolean).join('\n');
  const draft = editedDraft ?? generatedDraft;
  const canOpen = fieldsValid && draft.trim().length > 0 && draft.length <= 2000;
  const whatsappUrl = `${agency.whatsapp}?text=${encodeURIComponent(draft)}`;

  useEffect(() => {
    const restoreFrame = requestAnimationFrame(() => {
      if (initialDestination && validDestination(initialDestination)) {
        setDestination(initialDestination);
        setEditedDraft(null);
      }
      try {
        const saved = sessionStorage.getItem(storageKey);
        if (saved) {
          const data: unknown = JSON.parse(saved);
          if (data && typeof data === 'object') {
            const stored = data as Record<string, unknown>;
            if (!initialDestination && validDestination(stored.destination)) setDestination(stored.destination);
            if (typeof stored.month === 'string' && validMonth(stored.month)) setMonth(stored.month);
            if (typeof stored.travelers === 'string' && validTravelers(stored.travelers)) setTravelers(stored.travelers);
            // A different destination starts a fresh message; reloading the same trip keeps the visitor's edits.
            if ((!initialDestination || stored.destination === initialDestination) && typeof stored.editedDraft === 'string' && stored.editedDraft.length <= 2000) setEditedDraft(stored.editedDraft);
          }
        }
      } catch {
        // Draft editing remains available when session storage is unavailable.
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(restoreFrame);
  }, [initialDestination]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (!destination && !month && !travelers && editedDraft === null) sessionStorage.removeItem(storageKey);
      else sessionStorage.setItem(storageKey, JSON.stringify({ destination, month, travelers, editedDraft }));
    } catch {
      // Storage is an optional convenience; never block contacting the agency.
    }
  }, [destination, month, travelers, editedDraft, hydrated]);

  function clearDraft() {
    setDestination('');
    setMonth('');
    setTravelers('');
    setEditedDraft(null);
    setCopied(false);
    setStatus('Trip details cleared. A fresh message is ready.');
    try { sessionStorage.removeItem(storageKey); } catch { /* Storage may be blocked. */ }
  }

  async function copyDraft() {
    if (!canOpen) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setStatus('Draft copied. Open your preferred app and paste it into the conversation.');
    } catch {
      draftRef.current?.focus();
      draftRef.current?.select();
      setCopied(false);
      setStatus('Automatic copy is unavailable. Your draft is selected below. Copy it manually, then open your preferred app.');
    }
  }

  function resetCopyStatus() {
    setCopied(false);
    setStatus('');
  }

  return (
    <div className="inquiry-planner">
      <div className="inquiry-fields">
        <div className="inquiry-field">
          <label htmlFor="inquiry-destination">Destination <span>optional</span></label>
          <select id="inquiry-destination" value={destination} disabled={!hydrated} onChange={(event) => { setDestination(event.target.value); resetCopyStatus(); }}>
            <option value="">Still exploring</option>
            {destinations.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
          </select>
        </div>
        <div className="inquiry-fields-pair">
          <div className="inquiry-field">
            <label htmlFor="inquiry-month">Travel month <span>optional</span></label>
            <input id="inquiry-month" type="month" value={month} disabled={!hydrated} aria-invalid={Boolean(monthError)} aria-describedby={monthError ? 'month-error' : undefined} onChange={(event) => { setMonth(event.target.value); resetCopyStatus(); }} />
            {monthError && <p className="inquiry-error" id="month-error">{monthError}</p>}
          </div>
          <div className="inquiry-field">
            <label htmlFor="inquiry-travelers">Travelers <span>optional</span></label>
            <input id="inquiry-travelers" type="text" inputMode="numeric" pattern="[0-9]*" maxLength={3} placeholder="e.g. 2" value={travelers} disabled={!hydrated} aria-invalid={Boolean(travelersError)} aria-describedby={travelersError ? 'travelers-error' : 'travelers-help'} onChange={(event) => { setTravelers(event.target.value); resetCopyStatus(); }} />
            {travelersError ? <p className="inquiry-error" id="travelers-error">{travelersError}</p> : <p className="inquiry-field-help" id="travelers-help">1 to 100 people. For larger groups, mention this in your message.</p>}
          </div>
        </div>
      </div>

      <div className="inquiry-message">
        <div className="inquiry-message-heading">
          <label htmlFor="inquiry-draft">Your message</label>
          <button type="button" className="inquiry-clear" disabled={!hydrated} onClick={clearDraft}><IconTrash size={17} stroke={1.6} aria-hidden="true" /> Clear</button>
        </div>
        <textarea ref={draftRef} id="inquiry-draft" rows={7} maxLength={2000} value={draft} disabled={!hydrated} aria-invalid={!draft.trim()} aria-describedby={!draft.trim() ? "draft-help draft-error" : "draft-help"} onChange={(event) => { setEditedDraft(event.target.value); resetCopyStatus(); }} />
        <p className="inquiry-field-help" id="draft-help">You can edit this draft. Please leave out passport numbers, IDs and payment details.</p>
        {editedDraft !== null && <div><p className="inquiry-field-help">You edited this message. Changes to the trip fields apply only when you refresh the draft below. Refreshing replaces your edits.</p><button type="button" className="inquiry-refresh" onClick={() => { setEditedDraft(null); resetCopyStatus(); }}><IconRefresh size={17} stroke={1.6} aria-hidden="true" /> Refresh message from trip details</button></div>}
        {!draft.trim() && <p className="inquiry-error" id="draft-error">Add a message before opening a chat or copying your draft.</p>}
      </div>

      <div className="inquiry-actions">
        <a className="button inquiry-whatsapp" href={hydrated && canOpen ? whatsappUrl : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!hydrated || !canOpen} onClick={(event) => { if (!hydrated || !canOpen) event.preventDefault(); }}><IconBrandWhatsapp size={21} stroke={1.6} aria-hidden="true" /> Open WhatsApp with draft <IconArrowUpRight size={18} stroke={1.6} aria-hidden="true" /></a>
        <p className="inquiry-send-note">WhatsApp opens with your draft. Review it there and send when you are ready.</p>
      </div>

      <div className="inquiry-other-channels">
        <p>Prefer Messenger or Viber?</p>
        <p className="inquiry-field-help">Copy your message, then open the app and paste it.</p>
        <div className="inquiry-copy-row">
          <button type="button" className="button button-secondary" disabled={!hydrated || !canOpen} onClick={copyDraft}>{copied ? <IconCheck size={19} stroke={1.6} aria-hidden="true" /> : <IconCopy size={19} stroke={1.6} aria-hidden="true" />}{copied ? 'Draft copied' : '1. Copy draft'}</button>
          <a className="inquiry-channel-link" href={agency.messenger} target="_blank" rel="noopener noreferrer"><IconBrandMessenger size={20} stroke={1.6} aria-hidden="true" /> 2. Open Messenger <IconArrowUpRight size={16} stroke={1.6} aria-hidden="true" /></a>
          <a className="inquiry-channel-link" href={agency.viber}><IconPhone size={19} stroke={1.6} aria-hidden="true" /> 2. Open Viber <IconArrowUpRight size={16} stroke={1.6} aria-hidden="true" /></a>
        </div>
        <p className="inquiry-status" role="status" aria-live="polite">{status}</p>
      </div>

      <div className="inquiry-fallback">
        <p>Prefer to speak directly, or an app isn’t opening?</p>
        <div><a href={`tel:${agency.phoneIntl}`}><IconPhone size={18} stroke={1.6} aria-hidden="true" />{agency.phone}</a><a href={`mailto:${agency.email}`}><IconMail size={18} stroke={1.6} aria-hidden="true" />Email the team</a></div>
      </div>
      <p className="inquiry-privacy-note">Your draft stays in this browser tab’s session until cleared. Opening an app does not send a message. <Link href="/privacy">Privacy notice</Link></p>
      <noscript><div className="inquiry-noscript"><p>The draft builder needs JavaScript. You can still contact the team directly.</p><a href={agency.whatsapp} target="_blank" rel="noopener noreferrer">Open WhatsApp</a> · <a href={agency.messenger} target="_blank" rel="noopener noreferrer">Open Messenger</a> · <a href={`tel:${agency.phoneIntl}`}>Call {agency.phone}</a> · <a href={`mailto:${agency.email}`}>Email the team</a></div></noscript>
    </div>
  );
}
