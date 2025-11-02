import { createClient } from "redis";

const redisClient = createClient({
    url: "redis://127.0.0.1:6379", 
})

redisClient.on("error", (err) => {
    console.error("❌ Redis Client Error:", err);
  });

  const connectRedis = async () => {
    try {
      await redisClient.connect();
      console.log("✅ Redis Connected Successfully");
    } catch (err) {
      console.error("❌ Redis connection failed:", err);
    }
  };
  connectRedis();

export default redisClient;