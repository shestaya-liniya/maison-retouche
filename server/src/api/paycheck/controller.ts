import z from 'zod'

import { publicProcedure } from '../../trpc'
import { router } from '../../trpc'

export const paycheckController = router({
	create: publicProcedure
		.input(
			z.object({
				price: z.int().min(1),
				payDate: z.date(),
				serviceName: z.string(),
				phoneNumber: z.string(),
				vendorId: z.string(),
			}),
		)
		.mutation(() => {
			return 'hello'
		}),
})
