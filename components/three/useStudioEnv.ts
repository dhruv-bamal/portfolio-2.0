import { useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

/**
 * A procedural studio environment map (plan §18 lighting, §25 "no downloaded textures").
 *
 * Painted into a canvas as an equirectangular gradient, then pre-filtered with PMREM so the
 * brass and steel actually reflect something. Without an env map, high-metalness PBR renders
 * as near-black — this is what makes the metal read as machined rather than plastic.
 */
export function useStudioEnv() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  const envTexture = useMemo(() => {
    const w = 512;
    const h = 256;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Base: the void.
    ctx.fillStyle = '#0c0c10';
    ctx.fillRect(0, 0, w, h);

    // Key light — a warm softbox high and slightly to the left.
    const key = ctx.createRadialGradient(w * 0.32, h * 0.16, 0, w * 0.32, h * 0.16, h * 0.62);
    key.addColorStop(0, '#fff6e2');
    key.addColorStop(0.35, '#d8bd8c');
    key.addColorStop(1, 'rgba(12,12,16,0)');
    ctx.fillStyle = key;
    ctx.fillRect(0, 0, w, h);

    // Cool rim from the opposite side, so edges separate from the background.
    const rim = ctx.createRadialGradient(w * 0.82, h * 0.4, 0, w * 0.82, h * 0.4, h * 0.5);
    rim.addColorStop(0, '#7d8ea8');
    rim.addColorStop(1, 'rgba(12,12,16,0)');
    ctx.fillStyle = rim;
    ctx.fillRect(0, 0, w, h);

    // A dim floor bounce keeps the undersides from going fully black.
    const floor = ctx.createLinearGradient(0, h * 0.7, 0, h);
    floor.addColorStop(0, 'rgba(12,12,16,0)');
    floor.addColorStop(1, 'rgba(90,78,58,0.5)');
    ctx.fillStyle = floor;
    ctx.fillRect(0, h * 0.7, w, h * 0.3);

    const tex = new THREE.CanvasTexture(canvas);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;

    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const target = pmrem.fromEquirectangular(tex);
    tex.dispose();
    pmrem.dispose();

    return target.texture;
  }, [gl]);

  useEffect(() => {
    if (!envTexture) return;
    scene.environment = envTexture;
    return () => {
      scene.environment = null;
      envTexture.dispose();
    };
  }, [scene, envTexture]);

  return envTexture;
}
