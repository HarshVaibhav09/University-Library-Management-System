import { Ratelimit } from "@upstash/ratelimit";
import redis from "@/database/redis";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "10 s"), // aggressive for auth
  analytics: true,
  prefix: "library-auth",
});

export default ratelimit;
