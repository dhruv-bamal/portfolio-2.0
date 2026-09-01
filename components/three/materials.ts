import * as THREE from 'three';

/**
 * Material language (plan §18): machined brass and steel, matte plate, low-emissive jewels.
 *
 * Materials are lazily created and cached, never held as eagerly-constructed module
 * singletons. Disposal (plan §25) must be safe to call and then re-acquire — React's
 * StrictMode mounts, unmounts and remounts in development, and route changes do the same in
 * production. A getter that recreates on demand makes that sequence correct by construction.
 */

type MaterialKey =
  | 'brass'
  | 'brassDark'
  | 'steel'
  | 'bluedSteel'
  | 'plate'
  | 'jewel:ruby'
  | 'jewel:sapphire'
  | 'jewel:citrine'
  | 'jewel:brass';

const cache = new Map<MaterialKey, THREE.Material>();

export const JEWEL_COLORS = {
  ruby: '#c4384f',
  sapphire: '#3d6fbf',
  citrine: '#c98b2d',
  brass: '#c9a96a',
} as const;

export type JewelKey = keyof typeof JEWEL_COLORS;

const factories: Record<MaterialKey, () => THREE.Material> = {
  brass: () =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c9a96a'),
      metalness: 0.92,
      roughness: 0.26,
      envMapIntensity: 1.25,
    }),
  brassDark: () =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8d7440'),
      metalness: 0.9,
      roughness: 0.42,
      envMapIntensity: 1.0,
    }),
  steel: () =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c3c8d0'),
      metalness: 0.94,
      roughness: 0.2,
      envMapIntensity: 1.35,
    }),
  bluedSteel: () =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#42648f'),
      metalness: 0.88,
      roughness: 0.28,
      envMapIntensity: 1.2,
    }),
  plate: () =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2a2620'),
      metalness: 0.55,
      roughness: 0.74,
      envMapIntensity: 0.55,
    }),
  'jewel:ruby': () => makeJewel('ruby'),
  'jewel:sapphire': () => makeJewel('sapphire'),
  'jewel:citrine': () => makeJewel('citrine'),
  'jewel:brass': () => makeJewel('brass'),
};

function makeJewel(kind: JewelKey) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(JEWEL_COLORS[kind]),
    emissive: new THREE.Color(JEWEL_COLORS[kind]),
    emissiveIntensity: 0.4,
    metalness: 0.1,
    roughness: 0.14,
    transparent: true,
    opacity: 0.94,
  });
}

function get<T extends THREE.Material>(key: MaterialKey): T {
  const hit = cache.get(key);
  if (hit) return hit as T;
  const made = factories[key]();
  cache.set(key, made);
  return made as T;
}

export const materials = {
  get brass() {
    return get<THREE.MeshStandardMaterial>('brass');
  },
  get brassDark() {
    return get<THREE.MeshStandardMaterial>('brassDark');
  },
  get steel() {
    return get<THREE.MeshStandardMaterial>('steel');
  },
  get bluedSteel() {
    return get<THREE.MeshStandardMaterial>('bluedSteel');
  },
  get plate() {
    return get<THREE.MeshStandardMaterial>('plate');
  },
};

export function jewelMaterial(kind: JewelKey) {
  return get<THREE.MeshStandardMaterial>(`jewel:${kind}` as MaterialKey);
}

export function disposeMaterials() {
  cache.forEach((m) => m.dispose());
  cache.clear();
}
