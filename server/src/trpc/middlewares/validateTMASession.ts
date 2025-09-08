import { parse, validate } from '@telegram-apps/init-data-node'
import { TRPCError } from '@trpc/server'

import { publicMiddleware } from '..'
import { MIDDLEWARE_HEADERS } from './headers'

const handleValidateTMASession = (
	isDevEnv: boolean,
	initDataRaw: string,
	botToken: string,
) => {
	if (!isDevEnv) {
		try {
			validate(initDataRaw, botToken, {
				expiresIn: 3600,
			})
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'Unauthorized',
			})
		}
	}
}

export const validateTMASession = publicMiddleware(async ({ ctx, next }) => {
	const initDataRaw = ctx.req.headers.get(MIDDLEWARE_HEADERS.TMA_SESSION)

	if (!initDataRaw) {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: 'Missing TMA_SESSION header',
		})
	}

	handleValidateTMASession(ctx.isDevEnv, initDataRaw, ctx.env.BOT_TOKEN)

	const authorizedUser = parse(initDataRaw).user!

	return next({
		ctx: {
			...ctx,
			authorizedUser,
		},
	})
})
