import { TRPCError } from '@trpc/server'

import { publicMiddleware } from '..'

export const validateVendor = publicMiddleware(async ({ ctx, next }) => {
	if (!ctx.validatedUser) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
		})
	}

	/* if (!ctx.env.VENDORS_TELEGRAM_IDS.includes(ctx.validatedUser.id)) {
		throw new TRPCError({
			code: 'FORBIDDEN',
		})
	} */

	return next({
		ctx: {
			...ctx,
		},
	})
})
