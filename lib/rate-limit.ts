interface RateLimitStore {
  [ip: string]: {
    count: number;
    timestamp: number;
  };
}

// Simple in-memory store for rate limiting
const store: RateLimitStore = {};

// Clean up old entries every hour
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    Object.keys(store).forEach((ip) => {
      if (now - store[ip].timestamp > 24 * 60 * 60 * 1000) {
        delete store[ip];
      }
    });
  }, 60 * 60 * 1000);
}

export function checkRateLimit(ip: string, limit = 5, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now();
  
  // If no previous requests, allow
  if (!store[ip]) {
    store[ip] = { count: 1, timestamp: now };
    return true;
  }
  
  // If window expired, reset count
  if (now - store[ip].timestamp > windowMs) {
    store[ip] = { count: 1, timestamp: now };
    return true;
  }
  
  // If under limit, increment and allow
  if (store[ip].count < limit) {
    store[ip].count += 1;
    return true;
  }
  
  // Otherwise, rate limited
  return false;
}
