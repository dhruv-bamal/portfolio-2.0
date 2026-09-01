'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import { sceneState } from '@/lib/scroll/progress';

/**
 * Suspended dust.
 *
 * Not a generic particle system — this is the fine brass dust that hangs in the light of a
 * museum vitrine. It drifts on its own and answers to nothing: an earlier version pulled an
 * eddy toward the pointer, which turned the background into something the eye tracked instead
 * of the content in front of it. Atmosphere should stay behind the reader, not follow them.
 *
 * The field travels with the camera so it is always around the viewer, and points that fall
 * outside the box are recycled to the far side rather than respawned.
 */

const VERT = /* glsl */ `
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aAlpha;
  varying float vAlpha;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    // Size attenuates with distance so depth reads correctly.
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
    // Fade the very near and very far motes so the field has no visible boundary.
    float d = -mv.z;
    vAlpha = aAlpha * smoothstep(0.4, 2.0, d) * (1.0 - smoothstep(9.0, 16.0, d));
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    // Soft round mote; discard the corners of the point sprite.
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float soft = 1.0 - smoothstep(0.12, 0.5, d);
    gl_FragColor = vec4(uColor, soft * vAlpha);
  }
`;

const BOX = { x: 9, y: 6, z: 11 };

export function DustField({ count, reduced }: { count: number; reduced: boolean }) {
  const points = useRef<THREE.Points>(null);
  const camera = useThree((s) => s.camera);

  const { geometry, material, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const alphas = new Float32Array(count);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOX.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOX.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOX.z;
      scales[i] = 0.5 + Math.random() * 1.6;
      alphas[i] = 0.18 + Math.random() * 0.5;
      // Velocities are in world units per second. Settled after two passes: the first was
      // effectively frozen (under 0.01 u/s), the second read as a snowstorm. This is dust
      // hanging in still air — a mote crosses the box in roughly a minute.
      vel[i * 3] = (Math.random() - 0.5) * 0.09;
      vel[i * 3 + 1] = 0.04 + Math.random() * 0.1;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.09;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    g.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));

    const m = new THREE.ShaderMaterial({
      uniforms: {
        uSize: { value: 26 },
        uPixelRatio: { value: 1 },
        uColor: { value: new THREE.Color('#d8c191') },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: g, material: m, velocities: vel };
  }, [count]);

  // Release GPU resources with the component.
  useMemo(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state, delta) => {
    if (sceneState.paused || !points.current) return;
    const dt = Math.min(delta, 0.05);

    material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();

    // The field rides with the camera so the viewer is always inside it.
    points.current.position.copy(camera.position);
    points.current.quaternion.copy(camera.quaternion);

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      if (!reduced) {
        // Pure drift. The field deliberately does not react to the pointer: dust that chases
        // the cursor pulls attention to the background at exactly the moment the reader is
        // trying to attend to the foreground.
        arr[ix] += velocities[ix] * dt;
        arr[ix + 1] += velocities[ix + 1] * dt;
        arr[ix + 2] += velocities[ix + 2] * dt;
      }

      // Wrap through the box rather than respawning, so density stays even.
      if (arr[ix] > BOX.x / 2) arr[ix] -= BOX.x;
      else if (arr[ix] < -BOX.x / 2) arr[ix] += BOX.x;
      if (arr[ix + 1] > BOX.y / 2) arr[ix + 1] -= BOX.y;
      else if (arr[ix + 1] < -BOX.y / 2) arr[ix + 1] += BOX.y;
      if (arr[ix + 2] > BOX.z / 2) arr[ix + 2] -= BOX.z;
      else if (arr[ix + 2] < -BOX.z / 2) arr[ix + 2] += BOX.z;
    }

    pos.needsUpdate = true;
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
