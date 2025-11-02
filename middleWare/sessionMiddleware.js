import session from "express-session";
import {RedisStore} from "connect-redis";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

// Create Redis client
const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});
redisClient.connect().catch(console.error);

// Create Redis store directly
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:",
});

export const sessionMiddleware = session({
  store: redisStore,
  secret: process.env.SESSION_SECRET || "superSecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
