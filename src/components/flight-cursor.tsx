'use client';

import {useEffect, useRef} from 'react';
import {useTravelMotion} from './travel-motion-provider';
import './flight-cursor.css';

type Point = {x: number; y: number};
type Turn = {from: number; to: number; velocity: number; started: number; duration: number};

const MIN_TRAIL = 20;
const MAX_TRAIL = 320;
const SETTLE_MS = 450;
const TURN_MS = 220;
const MAX_TURN_RATE = 840;
const HEADING_DISTANCE = 6;
const TAIL_OFFSET = 36;
const TRAIL_NECK = 16;
const nativeCursorSelector = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [data-native-cursor], iframe';

function smoothPointerSpeed(current: number, distance: number, elapsed: number) {
  const milliseconds = Math.max(1, elapsed);
  const measuredSpeed = Math.min(2.5, Math.max(0, distance) / milliseconds);
  return current + (measuredSpeed - current) * (1 - Math.exp(-milliseconds / 60));
}

function speedTrailLength(speed: number) {
  return Math.min(MAX_TRAIL, MIN_TRAIL + Math.max(0, Math.min(2.5, speed)) * 200);
}

function shortestTurn(from: number, to: number) {
  return ((to - from + 180) % 360 + 360) % 360 - 180;
}

function startTurn(angle: number, velocity: number, target: number, now: number): Turn {
  const distance = shortestTurn(angle, target);
  const duration = Math.max(TURN_MS, Math.abs(distance) * 1500 / MAX_TURN_RATE);
  const direction = Math.sign(distance);
  // Monotone Hermite easing preserves an ongoing turn's velocity without overshooting.
  const initialVelocity = Math.sign(velocity) === direction
    ? direction * Math.min(Math.abs(velocity), MAX_TURN_RATE, Math.abs(distance) * 1500 / duration) : 0;
  return {from: angle, to: angle + distance, velocity: initialVelocity, started: now, duration};
}

function sampleTurn(turn: Turn, now: number) {
  const progress = Math.max(0, Math.min(1, (now - turn.started) / turn.duration));
  const square = progress * progress;
  const cube = square * progress;
  const distance = turn.to - turn.from;
  const tangent = turn.velocity * turn.duration / 1000;
  return {
    angle: turn.from + (3 * square - 2 * cube) * distance + (cube - 2 * square + progress) * tangent,
    velocity: progress === 1 ? 0
      : ((6 * progress - 6 * square) * distance + (3 * square - 4 * progress + 1) * tangent) * 1000 / turn.duration,
  };
}

function planeTail(pointer: Point, angle: number): Point {
  const radians = angle * Math.PI / 180;
  return {x: pointer.x - Math.cos(radians) * TAIL_OFFSET, y: pointer.y - Math.sin(radians) * TAIL_OFFSET};
}

function trailPath(history: Point[], tail: Point, angle: number, length: number): Point[] {
  const radians = angle * Math.PI / 180;
  const neckLength = Math.min(TRAIL_NECK, length * 0.6);
  const neck = {x: tail.x - Math.cos(radians) * neckLength, y: tail.y - Math.sin(radians) * neckLength};
  const backwards: Point[] = [tail, neck];
  let distance = neckLength;
  for (let index = history.length - 1; index >= 0; index--) {
    const point = history[index];
    // Leave a clean emission neck; tiny recent movements cannot curl around the airplane.
    if (Math.hypot(point.x - tail.x, point.y - tail.y) < neckLength + Math.min(8, length * 0.12)) continue;
    const previous = backwards[backwards.length - 1];
    const segment = Math.hypot(point.x - previous.x, point.y - previous.y);
    if (segment < 1) continue;
    const remaining = length - distance;
    if (segment >= remaining) {
      backwards.push({x: previous.x + (point.x - previous.x) * remaining / segment,
        y: previous.y + (point.y - previous.y) * remaining / segment});
      break;
    }
    backwards.push(point);
    distance += segment;
  }
  return backwards.reverse();
}

function usesNativeCursor(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(nativeCursorSelector));
}

function strokeCurve(context: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 2) return;
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length - 1; index++) {
    const point = points[index];
    const next = points[index + 1];
    context.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2);
  }
  const last = points[points.length - 1];
  context.lineTo(last.x, last.y);
  context.stroke();
}

function offsetCurve(points: Point[], offset: number): Point[] {
  return points.map((point, index) => {
    const before = points[Math.max(0, index - 1)];
    const after = points[Math.min(points.length - 1, index + 1)];
    const length = Math.hypot(after.x - before.x, after.y - before.y) || 1;
    const taper = Math.sin(Math.PI * index / Math.max(1, points.length - 1));
    return {
      x: point.x - (after.y - before.y) / length * offset * taper,
      y: point.y + (after.x - before.x) / length * offset * taper,
    };
  });
}

/** Decorative pointer artwork. Frames run only during movement and its brief settling tail. */
export function FlightCursor() {
  const {motionEnabled, reducedMotion} = useTravelMotion();
  const layerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const plane = planeRef.current;
    const canvas = canvasRef.current;
    if (!motionEnabled || reducedMotion || !layer || !plane || !canvas) return;
    const context = canvas.getContext('2d', {alpha: true});
    if (!context) return;

    const desktopPointer = window.matchMedia('(min-width: 768px) and (pointer: fine) and (hover: hover)');
    const systemMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let active = false;
    let hasPosition = false;
    let position: Point = {x: 0, y: 0};
    let tailHistory: Point[] = [];
    let smoothedTail: Point | null = null;
    let sampledPosition: Point = position;
    let headingAnchor: Point = position;
    let filteredVelocity: Point = {x: 0, y: 0};
    let flightStarted = false;
    let angle = -30;
    let targetAngle = angle;
    let turn: Turn = startTurn(angle, 0, angle, 0);
    let speed = 0;
    let pointerDistance = 0;
    let lastMove = 0;
    let previousFrame = 0;

    const permitted = () => desktopPointer.matches && !systemMotion.matches && !document.hidden;

    function clear() {
      if (!context || !layer) return;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      active = false;
      hasPosition = false;
      tailHistory = [];
      smoothedTail = null;
      filteredVelocity = {x: 0, y: 0};
      flightStarted = false;
      turn = startTurn(angle, 0, angle, 0);
      targetAngle = angle;
      speed = 0;
      pointerDistance = 0;
      previousFrame = 0;
      layer.style.opacity = '0';
      root.removeAttribute('data-flight-cursor');
      context.clearRect(0, 0, width, height);
    }

    function resize() {
      if (!canvas || !context) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!permitted()) clear();
      else if (active) requestFrame();
    }

    function requestFrame() {
      if (!frame) frame = window.requestAnimationFrame(render);
    }

    function render(now: number) {
      frame = 0;
      if (!context || !plane || !layer || !active || !permitted()) {
        clear();
        return;
      }
      const elapsed = now - lastMove;
      const frameElapsed = previousFrame ? Math.max(1, now - previousFrame) : 16;
      const delta = Math.min(frameElapsed, 40);
      previousFrame = now;
      const currentTurn = sampleTurn(turn, now);
      angle = currentTurn.angle;
      const rawVelocity = {x: (position.x - sampledPosition.x) / frameElapsed, y: (position.y - sampledPosition.y) / frameElapsed};
      const response = 1 - Math.exp(-delta / 60);
      filteredVelocity.x += (rawVelocity.x - filteredVelocity.x) * response;
      filteredVelocity.y += (rawVelocity.y - filteredVelocity.y) * response;
      sampledPosition = position;
      // Scalar travelled distance retains speed through a reversal; direction filtering stays separate.
      speed = smoothPointerSpeed(speed, pointerDistance, frameElapsed);
      pointerDistance = 0;
      const directionDistance = Math.hypot(position.x - headingAnchor.x, position.y - headingAnchor.y);
      if (elapsed < 60 && directionDistance >= HEADING_DISTANCE && Math.hypot(filteredVelocity.x, filteredVelocity.y) > 0.025) {
        const heading = Math.atan2(filteredVelocity.y, filteredVelocity.x) * 180 / Math.PI;
        if (Math.abs(shortestTurn(targetAngle, heading)) >= 3) {
          turn = startTurn(angle, currentTurn.velocity, heading, now);
          targetAngle = heading;
        }
        headingAnchor = position;
        flightStarted = true;
      }
      // The drawn nose at (42, 22) stays exactly on the pointer while the plane banks.
      plane.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) rotate(${angle}deg) translate(-42px, -22px)`;
      context.clearRect(0, 0, width, height);

      const opacity = Math.max(0, 1 - Math.max(0, elapsed - 70) / (SETTLE_MS - 70));
      const emission = planeTail(position, angle);
      const trailLength = speedTrailLength(speed);
      if (flightStarted && !tailHistory.length) {
        const radians = angle * Math.PI / 180;
        // The takeoff seed follows measured speed too; a slow hover starts with a short ribbon.
        tailHistory = [{x: emission.x - Math.cos(radians) * trailLength,
          y: emission.y - Math.sin(radians) * trailLength}, emission];
        smoothedTail = emission;
      }
      if (flightStarted && smoothedTail) {
        const tailResponse = 1 - Math.exp(-delta / 30);
        smoothedTail = {x: smoothedTail.x + (emission.x - smoothedTail.x) * tailResponse,
          y: smoothedTail.y + (emission.y - smoothedTail.y) * tailResponse};
        const latest = tailHistory[tailHistory.length - 1];
        if (Math.hypot(smoothedTail.x - latest.x, smoothedTail.y - latest.y) >= 3) tailHistory.push(smoothedTail);
        let travelled = 0;
        for (let index = tailHistory.length - 1; index > 0; index--) {
          travelled += Math.hypot(tailHistory[index].x - tailHistory[index - 1].x, tailHistory[index].y - tailHistory[index - 1].y);
          if (travelled > MAX_TRAIL + 64) {
            tailHistory = tailHistory.slice(index - 1);
            break;
          }
        }
        if (tailHistory.length > 140) tailHistory = tailHistory.slice(-140);
      }
      const shape = trailPath(tailHistory, emission, angle, trailLength);
      if (flightStarted && shape.length > 2 && opacity > 0) {
        const tail = shape[0];
        const head = shape[shape.length - 1];
        // Closed loops can share an endpoint; keep the gradient useful in that case.
        const gradientEnd = Math.hypot(head.x - tail.x, head.y - tail.y) < 1
          ? {x: head.x + 1, y: head.y + 1} : head;
        const ribbon = context.createLinearGradient(tail.x, tail.y, gradientEnd.x, gradientEnd.y);
        ribbon.addColorStop(0, 'rgba(54, 211, 231, 0)');
        ribbon.addColorStop(0.18, 'rgba(54, 211, 231, 0.35)');
        ribbon.addColorStop(0.55, 'rgba(81, 222, 237, 0.9)');
        ribbon.addColorStop(1, 'rgba(215, 255, 252, 0.98)');
        const edge = context.createLinearGradient(tail.x, tail.y, gradientEnd.x, gradientEnd.y);
        edge.addColorStop(0, 'rgba(7, 84, 79, 0)');
        edge.addColorStop(0.18, 'rgba(7, 84, 79, 0.2)');
        edge.addColorStop(0.55, 'rgba(7, 84, 79, 0.62)');
        edge.addColorStop(1, 'rgba(7, 84, 79, 0.7)');
        context.globalAlpha = opacity;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = ribbon;
        context.lineWidth = 16;
        context.globalAlpha = opacity * 0.12;
        strokeCurve(context, shape);
        context.globalAlpha = opacity;
        context.strokeStyle = edge;
        context.lineWidth = 10;
        strokeCurve(context, shape);
        context.strokeStyle = ribbon;
        context.lineWidth = 8;
        strokeCurve(context, shape);
        context.strokeStyle = 'rgba(245, 255, 254, 0.88)';
        context.lineWidth = 1.6;
        context.globalAlpha = opacity * 0.72;
        strokeCurve(context, shape);

        const goldRail = offsetCurve(shape, 5);
        context.strokeStyle = 'rgba(255, 212, 95, 0.82)';
        context.lineWidth = 1.5;
        context.globalAlpha = opacity * 0.6;
        strokeCurve(context, goldRail);
        context.globalAlpha = 1;
      }

      // Set the artwork position before taking over the native cursor.
      layer.style.opacity = '1';
      root.setAttribute('data-flight-cursor', '');
      if (elapsed < SETTLE_MS) requestFrame();
      else {
        tailHistory = [];
        smoothedTail = null;
        filteredVelocity = {x: 0, y: 0};
        flightStarted = false;
        headingAnchor = position;
        angle = targetAngle;
        turn = startTurn(angle, 0, angle, now);
        speed = 0;
        pointerDistance = 0;
        previousFrame = 0;
      }
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || !permitted() || usesNativeCursor(event.target)) {
        clear();
        return;
      }
      const now = performance.now();
      const next = {x: event.clientX, y: event.clientY};
      if (next.x < 0 || next.y < 0 || next.x >= width || next.y >= height) {
        clear();
        return;
      }
      if (!hasPosition) {
        position = next;
        sampledPosition = next;
        headingAnchor = next;
        hasPosition = true;
        lastMove = now;
      } else {
        const distance = Math.hypot(next.x - position.x, next.y - position.y);
        pointerDistance += distance;
        if (distance > 0.3) {
          lastMove = now;
        }
        position = next;
      }
      active = true;
      requestFrame();
    }

    function onOver(event: PointerEvent) {
      if (usesNativeCursor(event.target)) clear();
    }
    function onOut(event: PointerEvent) {
      if (!event.relatedTarget) clear();
    }
    function onVisibility() {
      if (document.hidden) clear();
    }
    function onPreference() {
      if (!permitted()) clear();
    }

    resize();
    window.addEventListener('pointermove', onMove, {passive: true});
    window.addEventListener('pointerover', onOver, {passive: true});
    window.addEventListener('pointerout', onOut, {passive: true});
    window.addEventListener('pointercancel', clear, {passive: true});
    window.addEventListener('blur', clear);
    window.addEventListener('resize', resize, {passive: true});
    root.addEventListener('pointerleave', clear, {passive: true});
    document.addEventListener('visibilitychange', onVisibility);
    desktopPointer.addEventListener('change', onPreference);
    systemMotion.addEventListener('change', onPreference);
    return () => {
      clear();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerout', onOut);
      window.removeEventListener('pointercancel', clear);
      window.removeEventListener('blur', clear);
      window.removeEventListener('resize', resize);
      root.removeEventListener('pointerleave', clear);
      document.removeEventListener('visibilitychange', onVisibility);
      desktopPointer.removeEventListener('change', onPreference);
      systemMotion.removeEventListener('change', onPreference);
    };
  }, [motionEnabled, reducedMotion]);

  return <div className="flight-cursor" ref={layerRef} aria-hidden="true">
    <canvas className="flight-cursor-ribbon" ref={canvasRef}/>
    <div className="flight-cursor-plane" ref={planeRef}>
      <svg viewBox="0 0 44 44" width="44" height="44" focusable="false">
        <path className="flight-plane-body" d="M42 22c0-2-5-4.2-11-4.3L27 4.5c-.5-1.6-2-2-3.5-1L22.5 17.5l-9.5 1L8 11H4l2.5 10L4 31h4l5-5.5 9.5 1 1 14c1.5 1 3 .6 3.5-1l4-13.2c6-.1 11-2.3 11-4.3Z"/>
        <path fill="#50d6e3" d="m24.1 4.5-.7 13.1 6 .1-3.7-12.4c-.3-.9-.7-1.1-1.6-.8Zm-.7 22 6-.2-3.7 12.4c-.3.9-.7 1.1-1.6.8l-.7-13Z"/>
        <path fill="#0b4943" d="m5.1 12 2.5 8 3.7-.5L7.3 12H5.1Zm0 18h2.2l4-4.6-3.7-.6L5.1 30Z"/>
        <path d="M10 22h21" fill="none" stroke="#ffd45f" strokeWidth="1.7" strokeLinecap="round"/>
        <path fill="#0b4943" d="M33 19.8c2.5.3 4.3 1 4.7 2.2-.4 1.2-2.2 1.9-4.7 2.2l.6-2.2-.6-2.2Z"/>
        <path d="m25 10 1.2 4M25 34l1.2-4" fill="none" stroke="#e6fffa" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </div>
  </div>;
}
