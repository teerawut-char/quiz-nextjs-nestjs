import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
	private redisClient: Redis;

	onModuleInit() {
		if (!process.env.REDIS_URL) {
			throw new Error('REDIS_URL environment variable is not set');
		}
		this.redisClient = new Redis(process.env.REDIS_URL);
	}

	onModuleDestroy() {
		this.redisClient.disconnect();
	}

	getClient(): Redis {
		return this.redisClient;
	}
}
