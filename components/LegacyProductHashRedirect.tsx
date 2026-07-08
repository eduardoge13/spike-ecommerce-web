'use client';

import { useEffect } from 'react';

interface LegacyProductHashRedirectProps {
  productPaths: Record<string, string>;
}

export default function LegacyProductHashRedirect({
  productPaths,
}: LegacyProductHashRedirectProps) {
  useEffect(() => {
    // URL fragments are not sent to the server, so legacy hash anchors
    // can only be upgraded client-side after the home page loads.
    const rawHash = window.location.hash.replace(/^#/, '');
    if (!rawHash) return;

    const normalizedHash = decodeURIComponent(rawHash);
    const productPath =
      productPaths[normalizedHash] ??
      productPaths[normalizedHash.replace(/^producto-/, '')];

    if (productPath) {
      window.location.replace(productPath);
    }
  }, [productPaths]);

  return null;
}
