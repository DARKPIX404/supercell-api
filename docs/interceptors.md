# Interceptors

Interceptors allow you to hook into the request/response lifecycle.

## Request Interceptor

Modify or log outgoing requests:

```typescript
client.addRequestInterceptor((url, options) => {
  console.log(`→ ${options.method} ${url}`);
});
```

## Response Interceptor

Process successful responses:

```typescript
client.addResponseInterceptor((data, url) => {
  console.log(`✓ ${url} — ${JSON.stringify(data).length} bytes`);
});
```

## Error Interceptor

Handle errors globally:

```typescript
client.addErrorInterceptor((error) => {
  console.error('API Error:', error.message);
  // Send to monitoring service
});
```

## Clearing Interceptors

```typescript
client.clearCache();
```

## TypeScript Types

```typescript
type RequestInterceptor = (url: string, options: RequestInit) => void;
type ResponseInterceptor = <T>(data: T, url: string) => void;
type ErrorInterceptor = (error: Error) => void;
```
