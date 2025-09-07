import chalk from 'chalk'
import { execSync } from 'child_process'
import chokidar from 'chokidar'

function main() {
	console.log(
		chalk.bgMagenta('[SCRIPTS] Watching Prisma schema for changes...'),
	)

	const watcher = chokidar.watch('src/db/prisma/schema.prisma')

	watcher.on('change', () => {
		console.log(
			chalk.bgMagenta('[SCRIPTS] Prisma schema changed, regenerating types...'),
		)
		try {
			execSync('bun run build:prisma', { stdio: 'inherit' })
			console.log(
				chalk.bgMagenta('[SCRIPTS] ✅ Types regenerated successfully'),
			)
		} catch (error) {
			console.log(
				chalk.bgMagenta('[SCRIPTS] ❌ Failed to regenerate types:', error),
			)
		}
	})

	process.on('SIGINT', () => {
		console.log(
			chalk.bgMagenta('[SCRIPTS] Shutting down prisma scheme watcher'),
		)
		watcher.close().then(() => {
			process.exit(0)
		})
	})
}

main()
