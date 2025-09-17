import { PrismaD1 } from '@prisma/adapter-d1'
import type { User } from '@telegram-apps/init-data-node'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

import VendorService from '../api/vendor/service'
import { PrismaClient } from '../db/prisma/generated/prisma'

export interface Env {
	ENVIRONMENT: 'prod' | 'dev'
	ALLOWED_ORIGINS: string
	DB: D1Database
	BOT_TOKEN: string

	VENDORS_TELEGRAM_IDS: number[]
}

export function createTRPCContext(
	opts: FetchCreateContextFnOptions & { env: Env },
) {
	const adapter = new PrismaD1(opts.env.DB)
	const prisma = new PrismaClient({ adapter })

	let validatedUser: User | undefined

	const services = {
		vendorService: new VendorService(prisma),
	}

	return {
		req: opts.req,
		resHeaders: opts.resHeaders,
		info: opts.info,
		env: opts.env,
		isDevEnv: opts.env.ENVIRONMENT === 'dev',
		validatedUser,
		...services,
	}
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>
