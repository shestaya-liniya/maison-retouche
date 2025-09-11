import { publicProcedure } from '..'
import { validateTMASession } from '../middlewares/validateTMASession'
import { validateVendor } from '../middlewares/validateVendor'

export const authenticatedProcedure = publicProcedure
	.use(validateTMASession)
	.use(validateVendor)
