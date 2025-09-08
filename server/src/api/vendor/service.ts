import type { PrismaClient } from '../../db/prisma/generated/prisma'
import PaycheckService from '../paycheck/service'

export default class VendorService {
	private prisma: PrismaClient
	private paycheckService: PaycheckService

	constructor(prisma: PrismaClient) {
		this.prisma = prisma
		this.paycheckService = new PaycheckService(prisma)
	}

	getByTelegramId(telegramId: number) {
		return this.prisma.vendor.findUniqueOrThrow({
			where: {
				telegramId: telegramId,
			},
		})
	}
}
