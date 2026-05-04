import { Prisma } from '@prisma/client';

export const softDeleteExtension = Prisma.defineExtension({
  name: 'softDelete',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const modelsWithSoftDelete = ['Concert', 'Booking', 'User'];

        if (model && modelsWithSoftDelete.includes(model)) {
          if (operation === 'findUnique') {
            operation = 'findFirst';
          }

          if (
            [
              'findFirst',
              'findMany',
              'count',
              'aggregate',
              'groupBy',
            ].includes(operation)
          ) {
            (args as any).where = { ...(args as any).where, deletedAt: null };
          }
        }

        return query(args);
      },
    },
  },
});
