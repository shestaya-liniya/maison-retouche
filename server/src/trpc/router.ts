import { paycheckController } from '../api/paycheck/controller'
import { vendorController } from '../api/vendor/controller'
import { router } from '.'

export const appRouter = router({
	paycheckController,
	vendorController,
})

export type AppRouter = typeof appRouter
