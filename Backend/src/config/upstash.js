import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

//create a ratelimiter that allows 10 requests per 20 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"), // 10 requests every 20 seconds
});

export default ratelimit;