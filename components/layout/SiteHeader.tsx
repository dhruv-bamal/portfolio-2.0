'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MovementMenu } from '@/components/layout/MovementMenu';
import { Mark } from '@/components/ui/Mark';
import { identity } from '@/lib/content';

import styles from './SiteHeader.module.css';

/**
 * Persistent minimal header (plan §12). Recedes to a hairline once the visitor has
 * committed to the journey, and returns whenever the menu opens or focus enters it.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [receded, setReceded] = useState(false);
  // The header floats over both the dark world and the paper spreads. It has to invert on
  // paper or its light type disappears — so it tracks whichever surface is beneath it.
  const [onPaper, setOnPaper] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === '/';

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const band = 28; // sample just below the header's vertical midpoint
      setReceded(window.scrollY > window.innerHeight * 0.6);

      const papers = document.querySelectorAll<HTMLElement>('[data-surface="paper"]');
      let covering = false;
      papers.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= band && r.bottom >= band) covering = true;
      });
      setOnPaper(covering);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return (
    <>
      <header
        className={`${styles.header} site-header ${receded && !menuOpen ? styles.receded : ''} ${
          onPaper ? styles.onPaper : ''
        }`}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label={`${identity.name} — home`}>
            <span className={styles.mark}>
              <Mark size={26} />
            </span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>{identity.name}</span>
              <span className={`mono ${styles.brandRole}`}>{identity.roleHeadline}</span>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            {/* Same-page anchors are plain <a>: a Next <Link> would route the hash itself and
                produce a native jump that Lenis cannot animate. */}
            {onHome ? (
              <>
                <a className={`mono ${styles.navLink}`} href="#work">
                  Work
                </a>
                <a className={`mono ${styles.navLink}`} href="#contact">
                  Contact
                </a>
              </>
            ) : (
              <>
                <Link className={`mono ${styles.navLink}`} href="/#work">
                  Work
                </Link>
                <Link className={`mono ${styles.navLink}`} href="/#contact">
                  Contact
                </Link>
              </>
            )}
            <a
              className={`mono ${styles.navLink}`}
              href="/resume/dhruv-bamal-backend-engineer.pdf"
              download
            >
              Résumé ↓
            </a>
            <button
              type="button"
              className={`mono ${styles.indexBtn}`}
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              Index
            </button>
          </nav>
        </div>
      </header>

      <MovementMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
