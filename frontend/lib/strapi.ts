/**
 * Strapi CMS client for the Azoytrix frontend.
 *
 * Small, dependency-free fetch wrapper around the Strapi REST API.
 * All reads are public (no auth token) so the navbar can render without a
 * logged-in user. When Strapi is unreachable the helpers surface an error so
 * callers can fall back to the hardcoded placeholders in lib/navbar.ts.
 */

export const STRAPI_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
).replace(/\/$/, "");

export const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  ? process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  : undefined;

interface FetchStrapiOptions extends RequestInit {
  signal?: AbortSignal;
  timeoutMs?: number;
}

export interface FetchStrapiResult<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Fetch a resource from Strapi's REST API (public endpoint).
 * Path should be relative, e.g. "/api/navbar?populate=*".
 */
export async function fetchStrapi<T>(
  path: string,
  { signal, timeoutMs = 5000, ...init }: FetchStrapiOptions = {}
): Promise<FetchStrapiResult<T>> {
  const url = `${STRAPI_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  const controller = new AbortController();
  const abortSignal = signal ?? controller.signal;

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  if (timeoutMs > 0) {
    timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/json",
      ...(init.headers || {}),
    };
    if (STRAPI_API_TOKEN) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const res = await fetch(url, {
      ...init,
      headers,
      signal: abortSignal,
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Strapi returned ${res.status} for ${path}`);
    }

    const json = (await res.json()) as T;
    return { data: json, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error(String(err)),
    };
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

/**
 * Convert a Strapi upload URL (relative or absolute) into a full URL.
 * Strapi stores images under /uploads/<file>; prepend the CMS origin when needed.
 */
export function strapiImageUrl(value: string | null | undefined): string {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${STRAPI_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}
