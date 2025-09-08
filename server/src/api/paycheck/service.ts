import type { PrismaClient } from '../../db/prisma/generated/prisma'

export default class PaycheckService {
	private prisma: PrismaClient

	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}
}
