"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let LoggerInterceptor = class LoggerInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, headers, body, user } = request;
        const requestId = headers['x-request-id'] || 'no-request-id';
        return next.handle().pipe((0, operators_1.tap)((data) => {
            const response = context.switchToHttp().getResponse();
            const statusCode = response.statusCode;
            try {
                this.log(method, url, statusCode, requestId, user, body, 'info', 'Request successful');
            }
            catch (e) {
                console.error('Logging failed:', e.message);
            }
        }), (0, operators_1.catchError)((error) => {
            const statusCode = error instanceof common_1.HttpException
                ? error.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            try {
                this.log(method, url, statusCode, requestId, user, body, 'error', error.message || 'Request failed');
            }
            catch (e) {
                console.error('Logging failed:', e.message);
            }
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
    log(method, url, statusCode, requestId, user, body, level, message) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            requestId,
            userId: user?.id || body?.userId || null,
            concertId: body?.concertId || body?.id || null,
            method,
            url,
            statusCode,
        };
        process.stdout.write(JSON.stringify(logEntry) + '\n');
    }
};
exports.LoggerInterceptor = LoggerInterceptor;
exports.LoggerInterceptor = LoggerInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggerInterceptor);
//# sourceMappingURL=logger.interceptor.js.map