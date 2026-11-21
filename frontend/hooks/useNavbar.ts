"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchStrapi } from "@/lib/strapi";
import {
  FALLBACK_NAVBAR,
  mapStrapiNavbar,
  NavbarConfig,
} from "@/lib/navbar";

/** Strapi REST path for the navbar singleton. Populate media + links. */
const NAVBAR_API_PATH = "/api/navbar?populate=logo,navLinks";

export interface UseNavbarReturn {
  config: NavbarConfig;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook that resolves the navbar configuration.
 *
 * - Renders the hardcoded placeholder immediately (current behaviour).
 * - Fetches Strapi in the background; when reachable, CMS data replaces the
 *   placeholder so the navbar is fully customizable from the admin panel.
 * - When Strapi is unreachable, the placeholder is kept and the error is
 *   exposed so the UI never breaks.
 */
export function useNavbar(): UseNavbarReturn {
  const [config, setConfig] = useState<NavbarConfig>(FALLBACK_NAVBAR);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cancelledRef = useRef(false);

  const load = useCallback(async (): Promise<void> => {
    cancelledRef.current = false;
    setLoading(true);
    try {
      const result = await fetchStrapi<any>(NAVBAR_API_PATH, {
        timeoutMs: 5000,
      });

      if (cancelledRef.current) return;

      if (result.error || !result.data) {
        throw result.error ?? new Error("No navbar data returned from Strapi");
      }

      setConfig(mapStrapiNavbar(result.data));
      setError(null);
    } catch (err) {
      if (cancelledRef.current) return;
      // CMS unreachable — keep the hardcoded placeholder so the UI never breaks.
      setError(err instanceof Error ? err : new Error(String(err)));
      setConfig(FALLBACK_NAVBAR);
    } finally {
      if (!cancelledRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    return () => {
      cancelledRef.current = true;
    };
  }, [load]);

  const refetch = useCallback(load, [load]);

  return { config, loading, error, refetch };
}
