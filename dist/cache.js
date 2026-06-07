/**
 * Simple in-memory cache with TTL support
 */
export class Cache {
    store = new Map();
    enabled;
    defaultTtl;
    constructor(enabled = true, ttlMs = 60000) {
        this.enabled = enabled;
        this.defaultTtl = ttlMs;
    }
    get(key) {
        if (!this.enabled)
            return undefined;
        const entry = this.store.get(key);
        if (!entry)
            return undefined;
        if (Date.now() > entry.expires) {
            this.store.delete(key);
            return undefined;
        }
        return entry.data;
    }
    set(key, data, ttl) {
        if (!this.enabled)
            return;
        this.store.set(key, {
            data,
            expires: Date.now() + (ttl ?? this.defaultTtl),
        });
    }
    delete(key) {
        this.store.delete(key);
    }
    clear() {
        this.store.clear();
    }
    has(key) {
        if (!this.enabled)
            return false;
        const entry = this.store.get(key);
        if (!entry)
            return false;
        if (Date.now() > entry.expires) {
            this.store.delete(key);
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=cache.js.map