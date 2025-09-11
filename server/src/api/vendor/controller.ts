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

			return ctx.vendorService.getByTelegramId(telegramId)
		}),
})
