import * as THREE from 'three';

/**
 * Procedural geometry for the Instrument (plan §25, readiness review A5.1).
 * Everything is generated from parameters — no downloaded models, no texture files.
 * Geometries are cached and shared so repeated parts cost nothing extra.
 */

const cache = new Map<string, THREE.BufferGeometry>();

function cached<T extends THREE.BufferGeometry>(key: string, make: () => T): T {
  const hit = cache.get(key);
  if (hit) return hit as T;
  const made = make();
  cache.set(key, made);
  return made;
}

/** Dispose every cached geometry — called when the whole 3D layer unmounts (plan §25). */
export function disposeGeometryCache() {
  cache.forEach((g) => g.dispose());
  cache.clear();
}

/**
 * An escape wheel: a toothed ring whose teeth are the angled "clubs" of a lever escapement.
 * The tooth profile is what makes the silhouette read as horology rather than as a gear.
 */
export function escapeWheelGeometry({
  teeth = 24,
  outerRadius = 1,
  // Shallow teeth on a thin rim: a real escape wheel is delicate, not a saw blade.
  baseRadius = 0.9,
  // A wide bore leaves four open sectors between the spokes — the gap the camera
  // passes through during the flagship transition (plan §14.5).
  innerRadius = 0.76,
  thickness = 0.045,
}: {
  teeth?: number;
  outerRadius?: number;
  baseRadius?: number;
  innerRadius?: number;
  thickness?: number;
} = {}) {
  const key = `escape:${teeth}:${outerRadius}:${baseRadius}:${innerRadius}:${thickness}`;
  return cached(key, () => {
    const shape = new THREE.Shape();
    const step = (Math.PI * 2) / teeth;

    for (let i = 0; i < teeth; i++) {
      const a0 = i * step;
      // Heel on the base circle.
      const heel = new THREE.Vector2(Math.cos(a0) * baseRadius, Math.sin(a0) * baseRadius);
      // A long, shallow impulse face sweeping forward to the tip — the ratchet profile.
      // The tooth occupies under half the pitch, so daylight shows between teeth.
      const tipA = a0 + step * 0.42;
      const tip = new THREE.Vector2(Math.cos(tipA) * outerRadius, Math.sin(tipA) * outerRadius);
      // Then the locking face drops almost radially back to the base circle.
      const backA = a0 + step * 0.47;
      const back = new THREE.Vector2(Math.cos(backA) * baseRadius, Math.sin(backA) * baseRadius);

      if (i === 0) shape.moveTo(heel.x, heel.y);
      else shape.lineTo(heel.x, heel.y);
      shape.lineTo(tip.x, tip.y);
      shape.lineTo(back.x, back.y);
      shape.absarc(0, 0, baseRadius, backA, a0 + step, false);
    }
    shape.closePath();

    // Hub bore.
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: thickness * 0.18,
      bevelSize: thickness * 0.16,
      bevelSegments: 2,
      curveSegments: 24,
    });
    geo.center();
    geo.computeVertexNormals();
    return geo;
  });
}

/**
 * A conventional gear wheel for the going train — trapezoidal teeth, crossed-out spokes
 * left to the caller.
 */
export function gearGeometry({
  teeth = 30,
  radius = 0.6,
  toothHeight = 0.06,
  innerRadius = 0.16,
  thickness = 0.035,
}: {
  teeth?: number;
  radius?: number;
  toothHeight?: number;
  innerRadius?: number;
  thickness?: number;
} = {}) {
  const key = `gear:${teeth}:${radius}:${toothHeight}:${innerRadius}:${thickness}`;
  return cached(key, () => {
    const shape = new THREE.Shape();
    const step = (Math.PI * 2) / teeth;
    const rOut = radius + toothHeight;

    for (let i = 0; i < teeth; i++) {
      const a = i * step;
      const p = [
        [a + step * 0.06, radius],
        [a + step * 0.2, rOut],
        [a + step * 0.42, rOut],
        [a + step * 0.56, radius],
      ] as const;
      for (let k = 0; k < p.length; k++) {
        const [ang, r] = p[k];
        const x = Math.cos(ang) * r;
        const y = Math.sin(ang) * r;
        if (i === 0 && k === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.absarc(0, 0, radius, a + step * 0.56, a + step, false);
    }
    shape.closePath();

    const hole = new THREE.Path();
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: thickness * 0.2,
      bevelSize: thickness * 0.18,
      bevelSegments: 1,
      curveSegments: 16,
    });
    geo.center();
    geo.computeVertexNormals();
    return geo;
  });
}

/**
 * The pallet fork — the part that catches one tooth at a time. Its silhouette is the
 * clearest visual statement of "exactly once" in the whole instrument.
 */
export function palletForkGeometry({
  span = 0.52,
  armWidth = 0.075,
  thickness = 0.05,
}: { span?: number; armWidth?: number; thickness?: number } = {}) {
  const key = `pallet:${span}:${armWidth}:${thickness}`;
  return cached(key, () => {
    const shape = new THREE.Shape();
    const w = armWidth / 2;

    // A tapered anchor: wide yoke at the top, narrow tail below the arbor.
    shape.moveTo(-span, 0.1);
    shape.lineTo(-span * 0.72, 0.24);
    shape.lineTo(-w * 1.6, 0.12);
    shape.lineTo(-w * 1.1, -0.42);
    shape.lineTo(w * 1.1, -0.42);
    shape.lineTo(w * 1.6, 0.12);
    shape.lineTo(span * 0.72, 0.24);
    shape.lineTo(span, 0.1);
    shape.lineTo(span * 0.82, -0.02);
    shape.lineTo(w * 1.9, 0.02);
    shape.lineTo(w * 1.5, -0.3);
    shape.lineTo(-w * 1.5, -0.3);
    shape.lineTo(-w * 1.9, 0.02);
    shape.lineTo(-span * 0.82, -0.02);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: thickness * 0.2,
      bevelSize: thickness * 0.16,
      bevelSegments: 1,
      curveSegments: 8,
    });
    geo.computeVertexNormals();
    return geo;
  });
}

/** A flat ring — bridges, chapter rings, the gong. */
export function ringGeometry(inner: number, outer: number, thickness: number, segments = 64) {
  const key = `ring:${inner}:${outer}:${thickness}:${segments}`;
  return cached(key, () => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outer, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, inner, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: false,
      curveSegments: segments,
    });
    geo.center();
    geo.computeVertexNormals();
    return geo;
  });
}

/** The mainspring: a flat coil swept along an Archimedean spiral. */
export function mainspringGeometry({
  turns = 5.2,
  rStart = 0.14,
  rEnd = 0.62,
  height = 0.22,
  ribbon = 0.012,
}: {
  turns?: number;
  rStart?: number;
  rEnd?: number;
  height?: number;
  ribbon?: number;
} = {}) {
  const key = `spring:${turns}:${rStart}:${rEnd}:${height}:${ribbon}`;
  return cached(key, () => {
    const points: THREE.Vector3[] = [];
    const steps = Math.round(turns * 48);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const a = t * turns * Math.PI * 2;
      const r = rStart + (rEnd - rStart) * t;
      points.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    // A thin ribbon reads as a spring; a tube reads as wire. Scale a tube to fake the ribbon.
    const geo = new THREE.TubeGeometry(curve, steps, ribbon, 4, false);
    geo.scale(1, 1, height / (ribbon * 2));
    geo.computeVertexNormals();
    return geo;
  });
}

/** Balance-wheel hairspring — same idea, finer and taller. */
export function hairspringGeometry() {
  return cached('hairspring', () => {
    const points: THREE.Vector3[] = [];
    const turns = 6.5;
    const steps = 360;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const a = t * turns * Math.PI * 2;
      const r = 0.05 + 0.2 * t;
      points.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const geo = new THREE.TubeGeometry(curve, steps, 0.005, 4, false);
    geo.computeVertexNormals();
    return geo;
  });
}

/** A cut jewel — the bearing stones, and each project's accent. */
export function jewelGeometry(radius = 0.05) {
  return cached(`jewel:${radius}`, () => {
    const geo = new THREE.OctahedronGeometry(radius, 0);
    geo.scale(1, 1, 0.55);
    geo.computeVertexNormals();
    return geo;
  });
}

/** A tapered arbor (axle) for wheels to sit on. */
export function arborGeometry(radius = 0.02, length = 0.4) {
  return cached(`arbor:${radius}:${length}`, () => {
    const geo = new THREE.CylinderGeometry(radius * 0.7, radius, length, 12);
    geo.rotateX(Math.PI / 2);
    geo.computeVertexNormals();
    return geo;
  });
}
