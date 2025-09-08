import { PrismaD1 } from '@prisma/adapter-d1'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

import VendorService from '../api/vendor/service'
import { PrismaClient } from '../db/prisma/generated/prisma'

export interface Env {
	ENVIRONMENT: 'prod' | 'dev'
	CLIENT_ORIGIN: string
	DB: D1Database
	BOT_TOKEN: string

	// Auth
	VENDORS_TELEGRAM_IDS: number[]
}

export function createTRPCContext(
	opts: FetchCreateContextFnOptions & { env: Env },
) {
	const adapter = new PrismaD1(opts.env.DB)
	const prisma = new PrismaClient({ adapter })

	const services = {
		vendorService: new VendorService(prisma),
	}

	return {
		req: opts.req,
		resHeaders: opts.resHeaders,
		info: opts.info,
		env: opts.env,
		isDevEnv: opts.env.ENVIRONMENT === 'dev',
		...services,
	}
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>
