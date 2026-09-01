'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Copy-to-clipboard with an announced confirmation (plan §20 forms, §27 screen readers).
 * Falls back silently to a selectable value if the clipboard API is unavailable.
 */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button type="button" className="btn btn-ghost" onClick={copy}>
        {copied ? 'Copied ✓' : label}
      </button>
      <span aria-live="polite" className="visually-hidden">
        {copied ? `${value} copied to clipboard` : ''}
      </span>
    </>
  );
}
