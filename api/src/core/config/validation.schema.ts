import { z } from 'zod';

export const validationSchema = z.object({
  // Application
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  APP_PORT: z.coerce.number().default(3000),

  // Database
  DATABASE_URL: z.string().min(1, { message: 'DATABASE_URL is required' }),
});
