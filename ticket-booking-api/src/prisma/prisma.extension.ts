import { Prisma } from '@prisma/client';

export const softDeleteExtension = Prisma.defineExtension({
  name: 'softDelete',
  model: {
    $allModels: {
      async softDelete<T, A>(
        this: T,
        where: Prisma.Args<T, 'update'>['where'],
      ): Promise<Prisma.Result<T, A, 'update'>> {
        const context = Prisma.getExtensionContext(this);
        return (context as any).update({
          where,
          data: { deletedAt: new Date() },
        });
      },
    },
  },
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (
          [
            'findFirst',
            'findUnique',
            'findMany',
            'count',
            'aggregate',
            'groupBy',
          ].includes(operation)
        ) {
          args.where = { ...args.where, deletedAt: null };
        }

        if (operation === 'delete') {
          return (query as any)({
            ...args,
            operation: 'update',
            args: {
              ...args,
              data: { deletedAt: new Date() },
            },
          });
        }

        if (operation === 'deleteMany') {
          return (query as any)({
            ...args,
            operation: 'updateMany',
            args: {
              ...args,
              data: { deletedAt: new Date() },
            },
          });
        }

        return query(args);
      },
    },
  },
});
