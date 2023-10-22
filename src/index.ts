import { Redis } from "@upstash/redis/cloudflare";

export interface Env {
	UPSTASH_REDIS_REST_URL: string;
	UPSTASH_REDIS_REST_TOKEN: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const redis = Redis.fromEnv(env);
		const slug = request.url.split("/").pop();
		if (!slug) {
			return Response.redirect("https://hosenur.dev");
		}
		const url = await redis.get(slug) as string;
		if (url) {
			return Response.redirect(url);
		}
		return Response.redirect("https://hosenur.io");
	},
};
