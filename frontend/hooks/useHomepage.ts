"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchStrapi } from "@/lib/strapi";
import {
  FALLBACK_HOMEPAGE,
  mapStrapiHomepage,
  HomepageConfig,
} from "@/lib/homepage";

/** Strapi REST path for the homepage single type (the backend populates all sections). */
const HOMEPAGE_API_PATH = "/api/homepage";

export interface UseHomepageReturn {
  config: HomepageConfig;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Resolves the homepage content.
 * Renders the hardcoded fallback immediately, then swaps in CMS content when
 * Strapi responds. If Strapi is unreachable the fallback is kept.
 */
export function useHomepage(): UseHomepageReturn {
  const [config, setConfig] = useState<HomepageConfig>(FALLBACK_HOMEPAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cancelledRef = useRef(false);

  const load = useCallback(async (): Promise<void> => {
    cancelledRef.current = false;
    try {
      const result = await fetchStrapi<unknown>(HOMEPAGE_API_PATH, {
        timeoutMs: 5000,
      });

      if (cancelledRef.current) return;

      if (result.error || !result.data) {
        throw result.error ?? new Error("No homepage data returned from Strapi");
      }

      setConfig(mapStrapiHomepage(result.data));
      setError(null);
    } catch (err) {
      if (cancelledRef.current) return;
      console.warn("[useHomepage] Strapi failed, using fallback:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setConfig(FALLBACK_HOMEPAGE);
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

  const refetch = useCallback(async (): Promise<void> => {
    setLoading(true);
    await load();
  }, [load]);

  return { config, loading, error, refetch };
}
