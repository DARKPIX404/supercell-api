/**
 * Simple in-memory cache with TTL support
 */
export declare class Cache {
    private store;
    private enabled;
    private defaultTtl;
    constructor(enabled?: boolean, ttlMs?: number);
    get<T>(key: string): T | undefined;
    set<T>(key: string, data: T, ttl?: number): void;
    delete(key: string): void;
    clear(): void;
    has(key: string): boolean;
}
//# sourceMappingURL=cache.d.ts.map