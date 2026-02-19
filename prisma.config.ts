import { defineConfig } from 'prisma/config';
import { validatedEnv } from './libs/config/src/config.constants';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: { url: validatedEnv.DATABASE_URL },
});
