'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';
import Link from 'next/link';
import { IconArrowLeft, IconArrowRight, IconArrowUpRight, IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import { destinations } from '@/lib/content';
import { useTravelMotion } from './travel-motion-provider';

type Navigation = 'previous' | 'next' | 'first' | 'last';
const keyDirections: Partial<Record<string, Navigation>> = { ArrowRight: 'next', ArrowLeft: 'previous', Home: 'first', End: 'last' };

export function DestinationCarousel() {
  const { motionEnabled, reducedMotion } = useTravelMotion();
  const [plugins] = useState(() => [AutoScroll({
    speed: .65,
    startDelay: 700,
    playOnInit: false,
    stopOnInteraction: true,
    stopOnMouseEnter: false,
    stopOnFocusIn: false,
  })]);
  const autoScroll = plugins[0];
  const [ref, api] = useEmblaCarousel({ align: 'center', loop: true, watchDrag: true }, plugins);
  const [selected, setSelected] = useState(0);
  const [previous, setPrevious] = useState(false);
  const [next, setNext] = useState(true);
  const [localPaused, setLocalPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const section = useRef<HTMLElement>(null);
  const activity = useRef({ hovered: false, focused: false, dragging: false, inView: false, manual: false });

  const reconcile = useCallback(() => {
    if (!api) return;
    const state = activity.current;
    const canPlay = motionEnabled && !reducedMotion && !localPaused && state.inView
      && !state.hovered && !state.focused && !state.dragging && document.visibilityState === 'visible';
    if (canPlay) {
      if (!autoScroll.isPlaying()) autoScroll.play();
    } else autoScroll.stop();
  }, [api, autoScroll, localPaused, motionEnabled, reducedMotion]);

  const update = useCallback(() => {
    if (!api) return;
    const index = api.selectedScrollSnap();
    setSelected(index);
    setPrevious(api.canScrollPrev());
    setNext(api.canScrollNext());
    if (activity.current.manual && !autoScroll.isPlaying()) {
      setAnnouncement(`${destinations[index].name}, destination ${index + 1} of ${destinations.length}.`);
    }
  }, [api, autoScroll]);

  useEffect(() => {
    if (!api || reducedMotion) return;
    const slides = api.slideNodes();
    const cards = slides.map((slide) => slide.querySelector<HTMLElement>('.destination-card'));
    let frame = 0;
    const paintDepth = () => {
      frame = 0;
      const viewport = api.rootNode().getBoundingClientRect();
      const center = viewport.left + viewport.width / 2;
      const compact = viewport.width < 600;
      // Measure the unrotated slide wrappers, including Embla's loop offsets,
      // before writing any transforms to their inner photo cards.
      const offsets = slides.map((slide) => {
        const bounds = slide.getBoundingClientRect();
        return Math.max(-2, Math.min(2, (bounds.left + bounds.width / 2 - center) / (bounds.width + (compact ? 18 : 32))));
      });
      offsets.forEach((offset, index) => {
        const card = cards[index];
        if (!card) return;
        const distance = Math.abs(offset);
        card.style.setProperty('--destination-turn', `${(-offset * (compact ? 18 : 28)).toFixed(3)}deg`);
        card.style.setProperty('--destination-depth', `${((compact ? 36 : 64) - distance * (compact ? 45 : 86)).toFixed(3)}px`);
        card.style.setProperty('--destination-drop', `${(distance * (compact ? 10 : 20)).toFixed(3)}px`);
        card.style.setProperty('--destination-scale', `${(1 - distance * .055).toFixed(4)}`);
        slides[index].style.zIndex = `${Math.round(100 - distance * 20)}`;
      });
    };
    const scheduleDepth = () => { if (!frame) frame = requestAnimationFrame(paintDepth); };
    api.on('scroll', scheduleDepth).on('reInit', scheduleDepth).on('resize', scheduleDepth);
    scheduleDepth();
    return () => {
      cancelAnimationFrame(frame);
      api.off('scroll', scheduleDepth).off('reInit', scheduleDepth).off('resize', scheduleDepth);
      cards.forEach((card, index) => {
        ['--destination-turn', '--destination-depth', '--destination-drop', '--destination-scale'].forEach((property) => card?.style.removeProperty(property));
        slides[index].style.removeProperty('z-index');
      });
    };
  }, [api, reducedMotion]);

  useEffect(() => {
    if (!api) return;
    const viewport = api.rootNode();
    activity.current.focused = !!section.current?.contains(document.activeElement);
    const pointerDown = () => {
      activity.current.dragging = true;
      activity.current.manual = true;
      autoScroll.stop();
    };
    const pointerUp = () => {
      activity.current.dragging = false;
      reconcile();
    };
    const settle = () => {
      update();
      activity.current.manual = false;
      reconcile();
    };
    const reinitialize = () => { update(); reconcile(); };
    const automaticStart = () => { activity.current.manual = false; setPlaying(true); };
    const automaticStop = () => setPlaying(false);
    const visibility = () => reconcile();
    const observer = new IntersectionObserver(([entry]) => {
      activity.current.inView = entry.isIntersecting;
      reconcile();
    });
    observer.observe(viewport);
    api.on('select', update).on('reInit', reinitialize).on('pointerDown', pointerDown)
      .on('pointerUp', pointerUp).on('settle', settle).on('autoScroll:play', automaticStart).on('autoScroll:stop', automaticStop);
    document.addEventListener('visibilitychange', visibility);
    const frame = requestAnimationFrame(() => { update(); reconcile(); });
    return () => {
      autoScroll.stop();
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      api.off('select', update).off('reInit', reinitialize).off('pointerDown', pointerDown)
        .off('pointerUp', pointerUp).off('settle', settle).off('autoScroll:play', automaticStart).off('autoScroll:stop', automaticStop);
    };
  }, [api, autoScroll, reconcile, update]);

  const navigate = (direction: Navigation) => {
    if (!api) return;
    if (direction === 'previous' && !api.canScrollPrev()) return;
    if (direction === 'next' && !api.canScrollNext()) return;
    autoScroll.stop();
    activity.current.manual = true;
    if (direction === 'previous') api.scrollPrev(reducedMotion);
    if (direction === 'next') api.scrollNext(reducedMotion);
    if (direction === 'first') api.scrollTo(0, reducedMotion);
    if (direction === 'last') api.scrollTo(destinations.length - 1, reducedMotion);
    reconcile();
  };
  const wantsToPlay = motionEnabled && !reducedMotion && !localPaused;
  const actuallyPlaying = playing && wantsToPlay;

  return (
    <section
      ref={section}
      className="section destination-section"
      data-carousel-motion={actuallyPlaying ? 'on' : 'off'}
      data-carousel-depth={!reducedMotion ? 'on' : 'off'}
      aria-labelledby="destinations-heading"
      onMouseEnter={() => { activity.current.hovered = true; reconcile(); }}
      onMouseLeave={() => { activity.current.hovered = false; reconcile(); }}
      onFocusCapture={() => { activity.current.focused = true; reconcile(); }}
      onBlurCapture={(event) => {
        activity.current.focused = event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget);
        reconcile();
      }}
    >
      <div className="container section-heading">
        <h2 id="destinations-heading">Where will your<br />next story begin?</h2>
        <p>Five places to spark your plans.<br />One team to help you get there.</p>
        <Link className="text-link" href="/destinations">Explore all destinations <IconArrowUpRight size={19} aria-hidden /></Link>
      </div>
      <div className="destination-orbit">
        <div
        id="destination-carousel-viewport"
        className="destination-viewport"
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured destinations. Drag to explore or use the arrow keys."
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const direction = keyDirections[event.key];
          if (!direction) return;
          event.preventDefault();
          navigate(direction);
        }}
      >
        <div className="destination-track">
          {destinations.map((destination, index) => (
            <article className="destination-slide" key={destination.slug} aria-roledescription="slide" aria-label={`${index + 1} of ${destinations.length}: ${destination.name}`}>
              <div className="destination-card">
                <Link href={`/destinations/${destination.slug}`} className="destination-photo" draggable={false}>
                  <Image src={destination.image} alt={destination.alt} fill draggable={false} sizes="(max-width: 600px) 78vw, (max-width: 1024px) 43vw, 350px" />
                  <div className="destination-caption"><h3>{destination.name}</h3><span className="round-arrow"><IconArrowUpRight size={23} aria-hidden /></span></div>
                </Link>
                <p>{destination.region}<span>{destination.phrase}</span></p>
              </div>
            </article>
          ))}
        </div>
        </div>
      </div>
      <div className="container carousel-footer">
        <p className="carousel-status">Exploring {destinations[selected].name}<span>{selected + 1} of {destinations.length}</span></p>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
        <div className="carousel-buttons">
          <button
            type="button"
            className="button button-secondary carousel-motion-button"
            aria-controls="destination-carousel-viewport"
            disabled={!motionEnabled || reducedMotion}
            title={reducedMotion ? 'Your device preference keeps the carousel still.' : !motionEnabled ? 'Carousel movement follows the page animation setting.' : undefined}
            onClick={() => setLocalPaused((paused) => !paused)}
          >
            {wantsToPlay ? <IconPlayerPause size={17} aria-hidden /> : <IconPlayerPlay size={17} aria-hidden />}
            {wantsToPlay ? 'Pause carousel' : 'Play carousel'}
          </button>
          <button type="button" className="icon-button" aria-label="Previous destination" disabled={!previous} onClick={() => navigate('previous')}><IconArrowLeft aria-hidden /></button>
          <button type="button" className="icon-button" aria-label="Next destination" disabled={!next} onClick={() => navigate('next')}><IconArrowRight aria-hidden /></button>
        </div>
      </div>
    </section>
  );
}
