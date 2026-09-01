import Link from 'next/link';

import { Mark } from '@/components/ui/Mark';

/** 404 as a "missing tooth" plate (plan §11) — content-complete and navigable. */
export default function NotFound() {
  return (
    <main
      id="main"
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 'var(--s-8) var(--gutter)',
      }}
    >
      <div style={{ maxWidth: '52ch', textAlign: 'center' }}>
        <span style={{ color: 'var(--brass)', display: 'inline-block' }}>
          <Mark size={54} />
        </span>
        <h1 className="display" style={{ fontSize: 'var(--t-display-1)', marginTop: 'var(--s-5)' }}>
          A missing tooth.
        </h1>
        <p style={{ color: 'var(--text-on-void-dim)', marginTop: 'var(--s-5)', lineHeight: 1.65 }}>
          This page is not part of the movement. Nothing was counted twice — there is simply
          nothing here.
        </p>
        <p style={{ marginTop: 'var(--s-7)', display: 'flex', gap: 'var(--s-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn" href="/">
            Back to the Instrument
          </Link>
          <Link className="btn btn-ghost" href="/#work">
            See the work
          </Link>
        </p>
      </div>
    </main>
  );
}
