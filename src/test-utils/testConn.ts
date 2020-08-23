import { createConnection } from "typeorm";
import path from "path";

/**
 * Creates a connection to a test database.
 * @param drop - Drop database and recreate.
 * @returns The database connection.
 */
export function testConn(drop: boolean = false) {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "typegraphql_example_test",
    synchronize: drop,
    dropSchema: drop,
    entities: [path.resolve(__dirname, "../entity/*.*")],
  });
}
