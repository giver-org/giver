import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { redis } from "./redis";
import { createSchema } from "./utils/createSchema";

(async function main() {
  await createConnection();

  // Build schema.
  const schema = await createSchema()

  const apolloServer = new ApolloServer({
    schema,
    // Add express req to resolver context.
    context: ({ req, res }) => ({ req, res }),
  });

  const app = Express();

  // Enable cors.
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  // Configure redis for storing sessions.
  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(3000, () => console.log("listening on http://localhost:3000"));
})();
