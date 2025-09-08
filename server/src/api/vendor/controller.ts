import { TRPCError } from '@trpc/server'
import z from 'zod'

import { router } from '../../trpc'
import { authenticatedProcedure } from '../../trpc/procedures/auth'

export const vendorController = router({
	getByTelegramId: authenticatedProcedure
		.input(
			z.object({
				telegramId: z.number(),
			}),
		)
		.query(({ ctx, input }) => {
			const { telegramId } = input

			if (!ctx.env.VENDORS_TELEGRAM_IDS.includes(telegramId)) {
				throw new TRPCError({
					code: 'FORBIDDEN',
				})
			}

			return ctx.vendorService.getByTelegramId(telegramId)
		}),
})
