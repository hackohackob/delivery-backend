import * as dotenv from 'dotenv';

export function configuration() {
  const currentEnv = process.env.NODE_ENV || 'development';
  const envFile = `./.env.${currentEnv}`;
  const config = dotenv.config({ path: envFile });
  return config.parsed;
}
