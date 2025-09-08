import { publicProcedure } from '..'
import { validateTMASession } from '../middlewares/validateTMASession'

export const authenticatedProcedure = publicProcedure.use(validateTMASession)
