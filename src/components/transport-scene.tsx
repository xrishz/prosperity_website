'use client';

import { useEffect, useRef, useState } from 'react';
import type * as Three from 'three';
import { TransportFallback } from './transport-fallback';

type Vehicle = 'plane' | 'bus';
type Props = {
  vehicle: Vehicle;
  motionEnabled: boolean;
  destination?: string;
  className?: string;
};
type ThreeModule = typeof import('three');
type Model = { group: Three.Group; body: Three.Group; wheels: Three.Group[]; roadMarkings: Three.Mesh[] };

const roadMarkingWidth = .55;
const roadMarkingPeriod = 5;
const roadMarkingEdge = 2.2;
const busRoadSpeed = .85;
const busWheelRadius = .305;

function destinationHeading(destination: string) {
  let hash = 0;
  for (let index = 0; index < destination.length; index++) hash += destination.charCodeAt(index);
  return ((hash % 9) - 4) * .018;
}

const colors = {
  cream: '#f9fcf3', cyan: '#70d0d8', green: '#0b5958', glass: '#164d5b',
  yellow: '#ffd066', rubber: '#143c3c', road: '#b8e4df', hub: '#d3e9df',
};

function makeModel(T: ThreeModule, vehicle: Vehicle): Model {
  const group = new T.Group();
  const body = new T.Group();
  group.add(body);
  const wheels: Three.Group[] = [];
  const roadMarkings: Three.Mesh[] = [];
  const material = (color: string, roughness = .4) => new T.MeshStandardMaterial({ color, roughness, metalness: .08 });
  const cream = material(colors.cream);
  const green = material(colors.green);
  const glass = material(colors.glass, .22);
  const yellow = material(colors.yellow);
  const add = (geometry: Three.BufferGeometry, mat: Three.Material, position: [number, number, number], parent = body) => {
    const mesh = new T.Mesh(geometry, mat);
    mesh.position.set(...position);
    parent.add(mesh);
    return mesh;
  };
  const box = (size: [number, number, number], mat: Three.Material, position: [number, number, number]) => add(new T.BoxGeometry(...size), mat, position);
  const roundBox = (width: number, height: number, depth: number, radius: number) => {
    radius = Math.min(radius, width / 2, height / 2);
    const bevel = Math.min(.025, width / 5, height / 5, depth / 5);
    const shape = new T.Shape();
    const x = -width / 2, y = -height / 2;
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    const geometry = new T.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 5 });
    geometry.center();
    return geometry;
  };

  if (vehicle === 'plane') {
    const cyan = material(colors.cyan);
    const profile = [
      [.025, -2.18], [.11, -2.02], [.21, -1.55], [.28, -.85],
      [.3, .45], [.26, 1.16], [.18, 1.6], [.075, 1.94], [0, 2.07],
    ].map(([radius, along]) => new T.Vector2(radius, along));
    const fuselage = add(new T.LatheGeometry(profile, 28), cream, [0, .12, 0]);
    fuselage.rotation.z = -Math.PI / 2;

    const wing = (points: [number, number][], mat: Three.Material, height = .1) => {
      const shape = new T.Shape();
      points.forEach(([x, z], index) => index ? shape.lineTo(x, z) : shape.moveTo(x, z));
      shape.closePath();
      const mesh = add(new T.ExtrudeGeometry(shape, { depth: .075, bevelEnabled: false }), mat, [0, height, 0]);
      mesh.rotation.x = Math.PI / 2;
      return mesh;
    };
    for (const side of [-1, 1]) {
      wing([[.35, .1 * side], [-.73, 1.8 * side], [-1.12, 1.83 * side], [-.76, .1 * side]], cyan);
      wing([[-.73, 1.72 * side], [-.73, 1.8 * side], [-1.12, 1.83 * side], [-1.1, 1.75 * side]], yellow, .11);
      wing([[-1.63, .08 * side], [-1.89, .85 * side], [-2.13, .82 * side], [-1.95, .07 * side]], green, .2);

      const engine = add(new T.CapsuleGeometry(.19, .47, 5, 18), cream, [-.22, -.27, .96 * side]);
      engine.rotation.z = Math.PI / 2;
      const mouth = add(new T.CylinderGeometry(.14, .14, .016, 18), glass, [.2, -.27, .96 * side]);
      mouth.rotation.z = Math.PI / 2;
      const rim = add(new T.TorusGeometry(.151, .031, 7, 18), cyan, [.22, -.27, .96 * side]);
      rim.rotation.y = Math.PI / 2;
      box([.23, .22, .06], green, [-.29, -.08, .96 * side]);

      for (let i = 0; i < 9; i++) {
        const window = add(new T.SphereGeometry(1, 10, 7), glass, [-.8 + i * .205, .18, .277 * side]);
        window.scale.set(.052, .07, .015);
      }
      box([1.94, .027, .02], green, [-.17, .047, .289 * side]);
    }
    const fin = new T.Shape();
    fin.moveTo(-2.04, .17);
    fin.lineTo(-1.88, .94);
    fin.lineTo(-1.59, .86);
    fin.lineTo(-1.44, .18);
    fin.closePath();
    add(new T.ExtrudeGeometry(fin, { depth: .09, bevelEnabled: false }), yellow, [0, 0, -.045]);
    const cockpit = add(new T.SphereGeometry(1, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), glass, [1.34, .28, 0]);
    cockpit.scale.set(.33, .15, .218);
    group.rotation.set(.025, -.22, .065);
  } else {
    add(roundBox(3.6, 1.34, 1.26, .17), yellow, [0, .16, 0]);
    add(roundBox(3.48, .25, 1.29, .035), green, [0, -.2, 0]);
    add(roundBox(3.34, .045, 1.16, .035), cream, [0, .86, 0]);
    for (const side of [-1, 1]) {
      for (let i = 0; i < 6; i++) {
        add(roundBox(.405, .45, .02, .045), glass, [-1.27 + i * .47, .42, .646 * side]);
      }
      box([.018, .81, .021], green, [1.25, .04, .66 * side]);
      const mirror = add(roundBox(.15, .15, .065, .025), green, [1.62, .54, .86 * side]);
      mirror.rotation.y = -.2 * side;
      box([.065, .04, .27], green, [1.62, .52, .72 * side]);
      for (const along of [-1.14, 1.12]) {
        const wheel = new T.Group();
        wheel.position.set(along, -.57, .66 * side);
        group.add(wheel);
        const tire = new T.Mesh(new T.CylinderGeometry(.305, .305, .23, 22), material(colors.rubber, .85));
        tire.rotation.x = Math.PI / 2;
        wheel.add(tire);
        const hub = new T.Mesh(new T.CylinderGeometry(.155, .155, .241, 16), material(colors.hub, .3));
        hub.rotation.x = Math.PI / 2;
        wheel.add(hub);
        const spoke = new T.Mesh(new T.BoxGeometry(.215, .035, .249), green);
        wheel.add(spoke);
        wheels.push(wheel);
      }
    }
    const windshield = add(roundBox(1.04, .47, .025, .065), glass, [1.813, .38, 0]);
    windshield.rotation.y = Math.PI / 2;
    const backWindow = add(roundBox(.9, .38, .02, .045), glass, [-1.818, .4, 0]);
    backWindow.rotation.y = Math.PI / 2;
    for (const side of [-1, 1]) {
      const headlight = add(new T.SphereGeometry(.095, 12, 8), cream, [1.82, -.22, .43 * side]);
      headlight.scale.x = .24;
      const backlight = add(new T.SphereGeometry(.065, 10, 6), material('#eb775b'), [-1.83, -.2, .44 * side]);
      backlight.scale.x = .23;
    }
    box([.08, .08, 1.1], green, [1.82, -.38, 0]);
    add(roundBox(4.85, .09, 2.35, .2), material(colors.road, .9), [0, -.925, 0], group);
    const markingGeometry = new T.BoxGeometry(roadMarkingWidth, .008, .045);
    for (let index = 0; index < roadMarkingPeriod; index++) {
      roadMarkings.push(add(markingGeometry, cream, [-2 + index, -.847, .95], group));
    }
    group.rotation.y = -.17;
  }
  return { group, body, wheels, roadMarkings };
}

function disposeScene(scene: Three.Scene) {
  const geometries = new Set<Three.BufferGeometry>();
  const materials = new Set<Three.Material>();
  const textures = new Set<Three.Texture>();
  scene.traverse((object) => {
    if (!(object as Three.Mesh).isMesh) return;
    const mesh = object as Three.Mesh;
    geometries.add(mesh.geometry);
    for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
      materials.add(material);
      for (const value of Object.values(material)) {
        if (value && typeof value === 'object' && 'isTexture' in value && value.isTexture) textures.add(value as Three.Texture);
      }
    }
  });
  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
}

export function TransportScene({ vehicle, motionEnabled, destination = '', className = '' }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const enabled = useRef(motionEnabled);
  const heading = useRef(destinationHeading(destination));
  const synchronize = useRef<(() => void) | null>(null);
  const [readyVehicle, setReadyVehicle] = useState<Vehicle | null>(null);
  const ready = readyVehicle === vehicle;

  useEffect(() => {
    enabled.current = motionEnabled;
    heading.current = destinationHeading(destination);
    synchronize.current?.();
  }, [motionEnabled, destination]);

  useEffect(() => {
    const stage = container.current;
    if (!stage) return;
    let disposed = false, initializing = false, failed = false, visible = false, painted = false;
    let renderer: Three.WebGLRenderer | undefined;
    let scene: Three.Scene | undefined;
    let camera: Three.OrthographicCamera | undefined;
    let model: Model | undefined;
    let lastTime = 0, lastPaint = 0, elapsed = 0;
    let displayedHeading = heading.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const small = window.matchMedia('(max-width: 767px)');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none;';

    const pose = () => {
      if (!model) return;
      const t = small.matches || reduced.matches ? 0 : elapsed;
      if (vehicle === 'plane') {
        model.group.position.y = Math.sin(t * .30) * .065;
        model.group.rotation.set(.025, -.22 + displayedHeading + Math.sin(t * .12) * .022, .065 + Math.sin(t * .24) * .027);
      } else {
        const bouncePhase = t * 6;
        // Keep the road and wheel contact points fixed while the suspension rebounds.
        model.body.position.y = (1 - Math.cos(bouncePhase)) * .055;
        model.body.rotation.set(Math.sin(bouncePhase * .5) * .014, 0, Math.sin(bouncePhase) * .02);
        for (const wheel of model.wheels) wheel.rotation.z = -t * busRoadSpeed / busWheelRadius;
        for (let index = 0; index < model.roadMarkings.length; index++) {
          const marking = model.roadMarkings[index];
          const center = ((-2 + index - t * busRoadSpeed + roadMarkingPeriod / 2) % roadMarkingPeriod + roadMarkingPeriod) % roadMarkingPeriod - roadMarkingPeriod / 2;
          // Trim the stripe at the road edges so its wrap is invisible and continuous.
          const left = Math.max(-roadMarkingEdge, center - roadMarkingWidth / 2);
          const right = Math.min(roadMarkingEdge, center + roadMarkingWidth / 2);
          const width = Math.max(0, right - left);
          marking.visible = width > 0;
          marking.scale.x = width / roadMarkingWidth;
          marking.position.x = (left + right) / 2;
        }
      }
    };
    const draw = () => {
      if (!renderer || !scene || !camera || failed || disposed) return;
      pose();
      try {
        renderer.render(scene, camera);
        if (!painted) { painted = true; setReadyVehicle(vehicle); }
      } catch { failed = true; renderer.setAnimationLoop(null); setReadyVehicle(null); }
    };
    const animate = (time: number) => {
      if (time - lastPaint < 1000 / 30) return;
      const step = lastTime ? Math.min((time - lastTime) / 1000, .08) : 0;
      elapsed += step;
      // A new country changes the target orientation, never the plane's current pose.
      displayedHeading += (heading.current - displayedHeading) * (1 - Math.exp(-step * 8));
      lastTime = time;
      lastPaint = time;
      draw();
    };
    const sync = () => {
      if (!renderer || failed || disposed) return;
      const moving = enabled.current && !reduced.matches && !small.matches && visible && document.visibilityState === 'visible';
      renderer.setAnimationLoop(moving ? animate : null);
      lastTime = 0;
      if (visible && document.visibilityState === 'visible') draw();
    };
    synchronize.current = sync;
    const resize = () => {
      if (!renderer || !camera || disposed) return;
      const { width, height } = stage.getBoundingClientRect();
      if (!width || !height) return;
      const aspect = width / height;
      const span = Math.max(vehicle === 'plane' ? 4.1 : 3.65, (vehicle === 'plane' ? 5.1 : 4.85) / aspect);
      camera.left = -span * aspect / 2;
      camera.right = span * aspect / 2;
      camera.top = span / 2;
      camera.bottom = -span / 2;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small.matches ? 1.25 : 1.5));
      renderer.setSize(width, height, false);
      sync();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      failed = true;
      renderer?.setAnimationLoop(null);
      if (!disposed) setReadyVehicle(null);
    };

    const initialize = async () => {
      if (initializing || renderer || disposed || failed || document.visibilityState !== 'visible') return;
      initializing = true;
      try {
        const T = await import('three');
        if (disposed) return;
        const context = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' });
        if (!context) { failed = true; return; }
        renderer = new T.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = T.SRGBColorSpace;
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.12;
        scene = new T.Scene();
        camera = new T.OrthographicCamera(-3, 3, 2, -2, .1, 50);
        camera.position.set(6.5, vehicle === 'plane' ? 4.5 : 3.2, 7);
        camera.lookAt(0, vehicle === 'plane' ? .08 : -.05, 0);
        scene.add(new T.HemisphereLight('#ffffff', '#7aada5', 2.3));
        const sunlight = new T.DirectionalLight('#fff2d6', 2.5);
        sunlight.position.set(4, 6, 5);
        scene.add(sunlight);
        const rim = new T.DirectionalLight('#b3edee', 1.1);
        rim.position.set(-4, 3, -4);
        scene.add(rim);
        model = makeModel(T, vehicle);
        scene.add(model.group);

        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = shadowCanvas.height = 96;
        const paint = shadowCanvas.getContext('2d');
        if (paint) {
          const gradient = paint.createRadialGradient(48, 48, 0, 48, 48, 48);
          gradient.addColorStop(0, 'rgba(7,60,66,.28)');
          gradient.addColorStop(.5, 'rgba(7,60,66,.12)');
          gradient.addColorStop(1, 'rgba(7,60,66,0)');
          paint.fillStyle = gradient;
          paint.fillRect(0, 0, 96, 96);
          const shadow = new T.Mesh(new T.PlaneGeometry(vehicle === 'plane' ? 4 : 4.3, vehicle === 'plane' ? 2.7 : 1.9), new T.MeshBasicMaterial({ map: new T.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
          shadow.rotation.x = -Math.PI / 2;
          shadow.position.set(.1, vehicle === 'plane' ? -.77 : -.861, .1);
          scene.add(shadow);
        }
        canvas.addEventListener('webglcontextlost', contextLost);
        stage.appendChild(canvas);
        resize();
      } catch {
        failed = true;
        renderer?.setAnimationLoop(null);
      }
    };
    const proximity = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void initialize();
    }, { rootMargin: '150px 0px' });
    proximity.observe(stage);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) void initialize();
      sync();
    });
    intersection.observe(stage);
    const dimensions = new ResizeObserver(resize);
    dimensions.observe(stage);
    const visibility = () => {
      if (visible && document.visibilityState === 'visible') void initialize();
      sync();
    };
    const preference = () => { resize(); sync(); };
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', preference);
    small.addEventListener('change', preference);

    return () => {
      disposed = true;
      synchronize.current = null;
      proximity.disconnect();
      intersection.disconnect();
      dimensions.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      reduced.removeEventListener('change', preference);
      small.removeEventListener('change', preference);
      canvas.removeEventListener('webglcontextlost', contextLost);
      renderer?.setAnimationLoop(null);
      if (scene) disposeScene(scene);
      renderer?.dispose();
      renderer?.forceContextLoss();
      canvas.remove();
    };
  }, [vehicle]);

  return (
    <div className={`transport-scene ${className}`} data-vehicle={vehicle} data-renderer={ready ? 'webgl' : 'static'} aria-hidden="true" style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, visibility: ready ? 'hidden' : 'visible' }}><TransportFallback vehicle={vehicle} /></div>
      <div ref={container} style={{ position: 'absolute', inset: 0, opacity: ready ? 1 : 0 }} />
    </div>
  );
}

export default TransportScene;
