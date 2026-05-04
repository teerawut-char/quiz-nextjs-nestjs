"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteExtension = void 0;
const client_1 = require("@prisma/client");
exports.softDeleteExtension = client_1.Prisma.defineExtension({
    name: 'softDelete',
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                const modelsWithSoftDelete = ['Concert', 'Booking', 'User'];
                if (model && modelsWithSoftDelete.includes(model)) {
                    if (operation === 'findUnique') {
                        operation = 'findFirst';
                    }
                    if ([
                        'findFirst',
                        'findMany',
                        'count',
                        'aggregate',
                        'groupBy',
                    ].includes(operation)) {
                        args.where = { ...args.where, deletedAt: null };
                    }
                }
                return query(args);
            },
        },
    },
});
//# sourceMappingURL=prisma.extension.js.map