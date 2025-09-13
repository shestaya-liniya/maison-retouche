import type { Paycheck, Prisma } from '../../db/prisma/generated/prisma'

export type ApiPaycheck = Paycheck
export type ApiPaycheckInput = Prisma.PaycheckUncheckedCreateInput
