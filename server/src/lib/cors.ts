import type { Env } from '../trpc/context'

const CORS_CONFIG = {
	ALLOWED_HEADERS: '*',
	ALLOWED_METHODS: '*',
} as const

function isOriginAllowed(
	origin: string | null,
	allowedOrigins: string[],
): origin is string {
	return origin !== null && allowedOrigins.includes(origin)
}

function createCORSHeaders(origin: string): Record<string, string> {
	return {
		'Access-Control-Allow-Origin': origin,
		'Access-Control-Allow-Headers': CORS_CONFIG.ALLOWED_HEADERS,
		'Access-Control-Allow-Methods': CORS_CONFIG.ALLOWED_METHODS,
	}
}

export function addCORSHeaders(
	request: Request,
	response: Response,
	env: Env,
): Response {
	const origin = request.headers.get('Origin')

	if (!isOriginAllowed(origin, env.ALLOWED_ORIGINS)) {
		return response
	}

	const newResponse = new Response(response.body, response)
	const corsHeaders = createCORSHeaders(origin)

	Object.entries(corsHeaders).forEach(([key, value]) => {
		newResponse.headers.set(key, value)
	})

	return newResponse
}

export function handleCORSPreflight(request: Request, env: Env): Response {
	const origin = request.headers.get('Origin')

	if (!isOriginAllowed(origin, env.ALLOWED_ORIGINS)) {
		return new Response('CORS policy violation', {
			status: 403,
			statusText: 'Forbidden',
		})
	}

	return new Response(null, {
		status: 200,
		headers: createCORSHeaders(origin),
	})
}
