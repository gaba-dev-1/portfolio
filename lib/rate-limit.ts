interface RateLimitStore {
  [ip: string]: {
    count: number;
    timestamp: number;
  };
}

const store: RateLimitStore = {};

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
  
  if (!store[ip]) {
    store[ip] = { count: 1, timestamp: now };
    return true;
  }
  
  if (now - store[ip].timestamp > windowMs) {
    store[ip] = { count: 1, timestamp: now };
    return true;
  }
  
  if (store[ip].count < limit) {
    store[ip].count += 1;
    return true;
  }
  
  return false;
}
