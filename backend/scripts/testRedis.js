require('dotenv').config();
const { createClient } = require('redis');

const testConnection = async () => {
    console.log('Testing Redis Connection...');
    const url = process.env.REDIS_URL;
    
    if (!url) {
        console.error('❌ REDIS_URL not found in environment variables.');
        process.exit(1);
    }

    console.log(`URL found (masked): ${url.replace(/:[^:@]*@/, ':****@')}`);

    const client = createClient({ url });

    client.on('error', (err) => {
        console.error('❌ Redis Connection Failed:', err.message);
        process.exit(1);
    });

    try {
        await client.connect();
        console.log('✅ Success! Redis is connected.');
        console.log('Pinging server...');
        const pong = await client.ping();
        console.log(`Server responded: ${pong}`);
        await client.quit();
    } catch (err) {
        console.error('❌ Error during test:', err);
    }
};

testConnection();
