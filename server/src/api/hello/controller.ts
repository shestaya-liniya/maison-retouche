import { publicProcedure, router } from '../../trpc'

export const hello = router({
	greetings: publicProcedure.query(async () => {
		return 'hello motherfucker'
	}),
})
