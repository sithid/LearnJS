import { RATE_LIMIT } from '../config.js';

class RateLimiter {
    constructor() {
        this.requests = [];
        this.isProcessing = false;
        this.queue = [];
    }

    async processQueue() {
        if (this.isProcessing || this.queue.length === 0) return;

        this.isProcessing = true;
        while (this.queue.length > 0) {
            if (!this.canMakeRequest()) {
                await this.wait(RATE_LIMIT.requestInterval);
                continue;
            }

            const { resolve, reject, request } = this.queue.shift();
            this.addRequest();

            try {
                const response = await request();
                resolve(response);
            } catch (error) {
                reject(error);
            }
        }
        this.isProcessing = false;
    }

    async enqueue(request) {
        return new Promise((resolve, reject) => {
            this.queue.push({ request, resolve, reject });
            this.processQueue();
        });
    }

    addRequest() {
        const now = Date.now();
        this.requests.push(now);
        this.cleanOldRequests(now);
    }

    cleanOldRequests(now) {
        const windowStart = now - 60000; // 1 minute window
        this.requests = this.requests.filter(time => time > windowStart);
    }

    canMakeRequest() {
        this.cleanOldRequests(Date.now());
        return this.requests.length < RATE_LIMIT.maxRequestsPerMinute;
    }

    async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getRequestCount() {
        this.cleanOldRequests(Date.now());
        return this.requests.length;
    }

    getQueueLength() {
        return this.queue.length;
    }
}

export const rateLimiter = new RateLimiter(); 