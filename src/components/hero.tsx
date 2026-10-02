'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {IconArrowDown, IconArrowUpRight, IconMapPin} from '@tabler/icons-react';
import {destinations} from '@/lib/content';
import {TransportScene} from './transport-scene';
import {MotionChoice, useTravelMotion} from './travel-motion-provider';

const scenes: Record<string, {image: string; alt: string; second: string; secondAlt: string; place: string}> = {
  japan: {image: '/images/japan-fuji.webp', alt: 'Mount Fuji framed by cherry blossoms beside a lake', second: '/images/japan-kyoto-autumn.webp', secondAlt: 'Kyoto temple above bright red autumn trees', place: 'Mount Fuji & Kyoto'},
  korea: {image: '/images/korea-busan-colorful.webp', alt: 'Colorful houses along the hillsides of Gamcheon Culture Village', second: '/images/korea-palace.webp', secondAlt: 'Traditional palace gate in Seoul', place: 'Busan & Seoul'},
  turkey: {image: '/images/cappadocia-alternate.webp', alt: 'Balloons floating over the valleys of Cappadocia', second: '/images/turkey-istanbul-ferry.webp', secondAlt: 'A ferry crossing the Bosphorus at sunset', place: 'Cappadocia & Istanbul'},
  greece: {image: '/images/greece-voutoumi-beach.webp', alt: 'Turquoise water beside the white beach and green hills of Voutoumi', second: '/images/greece-santorini.webp', secondAlt: 'Blue-domed church above the Aegean Sea in Santorini', place: 'Voutoumi Beach · Santorini'},
  dubai: {image: '/images/dubai-golden-dunes.webp', alt: 'Golden sand dunes lit by a warm desert sunset', second: '/images/dubai-skyline.webp', secondAlt: 'Dubai skyline with the Burj Khalifa', place: 'Desert & skyline'},
};

export function Hero() {
  const [selected, setSelected] = useState('greece');
  const [isSwitching, setIsSwitching] = useState(false);
  const flightElement = useRef<HTMLDivElement>(null);
  const flightActive = useRef(false);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const destination = destinations.find(item => item.slug === selected)!;
  const scene = scenes[selected];
  const {motionEnabled} = useTravelMotion();

  const finishFlight = useCallback(() => {
    flightActive.current = false;
    if (revealTimer.current) clearTimeout(revealTimer.current);
    revealTimer.current = null;
    setIsSwitching(false);
  }, []);

  useEffect(() => {
    const plane = flightElement.current;
    // Pausing motion, reducing motion, or changing viewport must also reveal the photos.
    plane?.addEventListener('animationcancel', finishFlight);
    return () => plane?.removeEventListener('animationcancel', finishFlight);
  }, [finishFlight]);

  useEffect(() => () => {
    if (revealTimer.current) clearTimeout(revealTimer.current);
  }, []);

  function chooseDestination(slug: string) {
    if (slug === selected) return;
    setSelected(slug);
    if (!motionEnabled) {
      finishFlight();
      return;
    }
    // A second choice changes the destination without teleporting a plane already in flight.
    if (flightActive.current) return;
    flightActive.current = true;
    setIsSwitching(true);
    // Animation completion normally reveals the photos; this bounds interrupted timelines.
    revealTimer.current = setTimeout(finishFlight, 1700);
  }

  const inFlight = isSwitching && motionEnabled;

  return <section className="atlas-hero" aria-labelledby="hero-heading">
    <div className="atlas-cloud cloud-one" aria-hidden/><div className="atlas-cloud cloud-two" aria-hidden/>
    <div className="atlas-hero-grid container">
      <div className="atlas-hero-copy">
        <h1 id="hero-heading"><span>Somewhere new.</span><span>Something unforgettable.</span></h1>
        <p>Personal travel planning from Cabuyao, Laguna.<br className="desktop-break"/> Big adventures. A real person by your side.</p>
        <div className="atlas-hero-actions">
          <Link href={`/plan?destination=${selected}`} className="button">Plan your trip <IconArrowUpRight size={20} aria-hidden/></Link>
          <a href="#gallery-heading" className="text-link">Explore the photos <IconArrowDown size={19} aria-hidden/></a>
        </div>
        <fieldset className="atlas-country-picker">
          <legend>Where would you love to go?</legend>
          <div>{destinations.map(item => <button type="button" key={item.slug} aria-pressed={selected === item.slug}
            className={selected === item.slug ? 'is-selected' : undefined} onClick={() => chooseDestination(item.slug)}>
            {item.name}
          </button>)}</div>
        </fieldset>
      </div>
      <div className="atlas-hero-scene" data-flight={inFlight ? 'flying' : 'arrived'}>
        <div className="atlas-sun" aria-hidden/>
        <figure className="atlas-photo-main" key={scene.image}>
          <Image src={scene.image} alt={scene.alt} fill sizes="(max-width: 767px) 85vw, (max-width: 1100px) 50vw, 620px" preload={selected === 'greece'}/>
          <figcaption><IconMapPin size={18} aria-hidden/><strong>{destination.name}</strong><span>Destination inspiration</span></figcaption>
        </figure>
        <figure className="atlas-photo-small" key={scene.second}>
          <Image src={scene.second} alt={scene.secondAlt} fill sizes="(max-width: 767px) 40vw, 220px"/>
        </figure>
        <div className="atlas-plane-flight" ref={flightElement} data-flight={inFlight ? 'switching' : undefined}
          onAnimationEnd={event => { if (event.target === event.currentTarget) finishFlight(); }}>
          <TransportScene vehicle="plane" destination={selected} motionEnabled={motionEnabled} className="atlas-plane"/>
          <span className="atlas-flight-trail" aria-hidden/>
        </div>
        <div className="atlas-scene-caption" aria-live="polite" aria-atomic="true">
          <span>{inFlight ? `On our way to ${destination.name}…` : scene.place}</span><Link href={`/destinations/${selected}`}>Discover {destination.name} <IconArrowUpRight size={18} aria-hidden/></Link>
        </div>
      </div>
    </div>
    <div className="atlas-hero-bottom container"><span>Your trusted partner in every journey</span><MotionChoice/></div>
  </section>;
}
