const { createClient } = require('redis');

let client;

const getRedisClient = async () => {
    if (!client) {
        client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });

        client.on('error', (err) => console.log('Redis Client Error', err));
        client.on('connect', () => console.log('✅ Redis Client Connected'));
        
        await client.connect();
    }
    return client;
};

// Initialize connection immediately to catch errors early, but handle promise
getRedisClient().catch(console.error);

module.exports = {
  getRedisClient
};
