// src/services/api.ts
export const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

type Opts = RequestInit & { query?: Record<string, any> };

function buildUrl(path: string, query?: Record<string, any>) {
    const base = API_BASE || window.location.origin;
    const url = new URL(path, base);
    if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    return url.toString();
}

export async function apiFetch<T = any>(path: string, opts: Opts = {}): Promise<T> {
    const { query, headers, ...rest } = opts;
    const url = buildUrl(path, query);

    const token = localStorage.getItem('accessToken');

    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(headers || {}),
        },
        ...rest,
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || res.statusText);
    }
    return (await res.json()) as T;
}
