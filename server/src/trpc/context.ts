import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export interface Env {
	CLIENT_ORIGIN: string
	DB: D1Database
}

export function createTRPCContext(
	opts: FetchCreateContextFnOptions & { env: Env },
) {
	return {
		req: opts.req,
		resHeaders: opts.resHeaders,
		info: opts.info,
		env: opts.env,
	}
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>
