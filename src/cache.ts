/**
 * Simple in-memory cache with TTL support
 */
export class Cache {
  private store = new Map<string, { data: unknown; expires: number }>();
  private enabled: boolean;
  private defaultTtl: number;

  constructor(enabled = true, ttlMs = 60000) {
    this.enabled = enabled;
    this.defaultTtl = ttlMs;
  }

  get<T>(key: string): T | undefined {
    if (!this.enabled) return undefined;
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expires) {
      this.store.delete(key);
      return undefined;
    }
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    if (!this.enabled) return;
    this.store.set(key, {
      data,
      expires: Date.now() + (ttl ?? this.defaultTtl),
    });
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  has(key: string): boolean {
    if (!this.enabled) return false;
    const entry = this.store.get(key);
    if (!entry) return false;
    if (Date.now() > entry.expires) {
      this.store.delete(key);
      return false;
    }
    return true;
  }
}
