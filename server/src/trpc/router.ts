import { hello } from '../api/hello/controller'
import { router } from '.'

export const appRouter = router({
	hello,
})

export type AppRouter = typeof appRouter
