"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ioredis_1 = require("ioredis");
async function flushRedis() {
    if (!process.env.REDIS_URL) {
        console.error('REDIS_URL not set');
        return;
    }
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    try {
        await redis.flushall();
        console.log('Redis cleared successfully (FLUSHALL)');
    }
    catch (err) {
        console.error('Failed to clear Redis:', err);
    }
    finally {
        redis.disconnect();
    }
}
flushRedis();
//# sourceMappingURL=flush_redis.js.map