"use client";

import { useEffect } from 'react';
import { suppressHydrationWarnings, cleanExtensionAttributes } from '@/lib/utils/hydrationErrorSuppress';

export default function HydrationErrorSuppressor() {
  useEffect(() => {
    // Run hydration error suppression immediately
    suppressHydrationWarnings();
    const cleanup = cleanExtensionAttributes();
    return cleanup;
  }, []);

  return null;
}