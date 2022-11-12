import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Create a .env.local at the root of the project. It will be loaded into the { env } export.

// .env.local is not tracked by Git. You should put secrets like environment
// variables there.

// You can also come here and add properties to EnvVars for autocomplete, but
// this is optional.

const path = resolve(process.cwd(), '.env.local')
dotenv.config({ path })

type EnvVars = {
  HOSTNAME: string
  NUMBER: number
  PASSWORD: string
}

type AnyOtherKey<T extends { [k: string]: any }> = T &
  Omit<{ [k: string]: any }, keyof T>

export const env = process.env as unknown as Readonly<AnyOtherKey<EnvVars>>
