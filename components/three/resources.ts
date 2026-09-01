import { disposeGeometryCache } from './geometry';
import { disposeMaterials } from './materials';
import { disposeHallMaterials } from './MovementHall';

/**
 * Ref-counted lifetime for the shared geometry and material caches (plan §25 disposal).
 *
 * A naive "dispose on unmount" is wrong here: React StrictMode mounts → unmounts → remounts
 * in development, and route changes do the same in production. Disposing eagerly would tear
 * down resources the very next mount needs. Instead we count holders and dispose only after
 * the last one has been gone for a moment.
 */

let holders = 0;
let pending: ReturnType<typeof setTimeout> | undefined;
const GRACE_MS = 2000;

export function acquireSceneResources() {
  holders += 1;
  if (pending) {
    clearTimeout(pending);
    pending = undefined;
  }
}

export function releaseSceneResources() {
  holders = Math.max(0, holders - 1);
  if (holders > 0) return;

  if (pending) clearTimeout(pending);
  pending = setTimeout(() => {
    pending = undefined;
    if (holders === 0) {
      disposeGeometryCache();
      disposeMaterials();
      disposeHallMaterials();
    }
  }, GRACE_MS);
}
