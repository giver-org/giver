import { v4 } from "uuid";
import { redis } from "../../redis";

export async function createConfirmationUrl(userId: number) {
  const token = v4();
  await redis.set(token, userId, "ex", 60 * 60 * 24); // 1 day expiration

  // Example url for a hypothetical frontend at port 3000.
  // Use ConfirmUser mutation with token to finish registration.
  return `http://localhost:3000/user/confirm/${token}`;
}
