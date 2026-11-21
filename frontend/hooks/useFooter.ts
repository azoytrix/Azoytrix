"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchStrapi } from "@/lib/strapi";
import {
  FALLBACK_FOOTER,
  mapStrapiFooter,
  FooterConfig,
} from "@/lib/footer";

/** Strapi REST path for the footer single type. */
const FOOTER_API_PATH = "/api/footer?populate=logo,exploreLinks,bottomTags";

export interface UseFooterReturn {
  config: FooterConfig;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Resolves the footer configuration.
 * Renders the hardcoded fallback immediately, then swaps in CMS data when
 * Strapi responds. If Strapi is unreachable the fallback is kept.
 */
export function useFooter(): UseFooterReturn {
  const [config, setConfig] = useState<FooterConfig>(FALLBACK_FOOTER);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cancelledRef = useRef(false);

  const load = useCallback(async (): Promise<void> => {
    cancelledRef.current = false;
    setLoading(true);
    try {
      const result = await fetchStrapi<any>(FOOTER_API_PATH, {
        timeoutMs: 5000,
      });

      if (cancelledRef.current) return;

      if (result.error || !result.data) {
        throw result.error ?? new Error("No footer data returned from Strapi");
      }

      setConfig(mapStrapiFooter(result.data));
      setError(null);
    } catch (err) {
      if (cancelledRef.current) return;
      setError(err instanceof Error ? err : new Error(String(err)));
      setConfig(FALLBACK_FOOTER);
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

  return { config, loading, error, refetch: load };
}