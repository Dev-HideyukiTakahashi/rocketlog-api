import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  // coerce converte para number para garantir, caso venha string
  PORT: z.coerce.number().default(3333),
});

export const env = envSchema.parse(process.env);
