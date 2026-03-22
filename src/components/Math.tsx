"use client";

import { useMemo } from "react";
import katex from "katex";

/**
 * Inline math component: renders LaTeX inline with text.
 * Usage: <Tex>{`\\eta_0 \\propto M_w^{3.4}`}</Tex>
 */
export function Tex({ children, className = "" }: { children: string; className?: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, {
        throwOnError: false,
        displayMode: false,
        strict: false,
        trust: true,
      });
    } catch {
      return children;
    }
  }, [children]);

  return (
    <span
      className={`tex-inline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Block math component: renders LaTeX as a display equation.
 * Usage: <TexBlock>{`\\eta_0 = K \\cdot M_w^{3.4}`}</TexBlock>
 */
export function TexBlock({ children, className = "" }: { children: string; className?: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, {
        throwOnError: false,
        displayMode: true,
        strict: false,
        trust: true,
      });
    } catch {
      return children;
    }
  }, [children]);

  return (
    <div
      className={`math-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
