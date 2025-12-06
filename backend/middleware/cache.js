const { getRedisClient } = require('../config/redis');

const CACHE_TTL = 3600; // 1 hour in seconds

// Middleware to check cache
const cacheItems = async (req, res, next) => {
  try {
    const client = await getRedisClient();
    
    // Create a key based on the request URL (including query params)
    const key = `items:${req.originalUrl}`;
    
    const cachedData = await client.get(key);
    
    if (cachedData) {
      console.log(`⚡ Cache hit for ${key}`);
      return res.status(200).json(JSON.parse(cachedData));
    }
    
    console.log(`Cache miss for ${key}`);
    
    // Attach the key to the request object so the controller knows what to set
    req.cacheKey = key;
    next();
  } catch (error) {
    console.error('Redis cache error:', error);
    // Fallback to database if redis fails
    next();
  }
};

// Utility to clear cache
const clearCache = async (pattern) => {
  try {
    const client = await getRedisClient();
    const keys = await client.keys(pattern);
    
    if (keys.length > 0) {
      await client.del(keys);
      console.log(`🧹 Cleared cache for keys: ${keys.join(', ')}`);
    }
  } catch (error) {
    console.error('Redis clear cache error:', error);
  }
};

module.exports = {
  cacheItems,
  clearCache,
  CACHE_TTL
};
