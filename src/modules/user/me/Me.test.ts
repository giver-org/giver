/** Integration tests for me resolver. */

import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import { User } from "../../../entity/User";

let conn: Connection;

jest.setTimeout(15000);

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async (done) => {
  await conn.close();
  done();
});

const meQuery = `
  {
    me {
      id
      firstName
      lastName
      name
      email
    }
  }
`;

describe("Me", () => {
  it("get user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    // Execute response.
    const response = await gCall({
      source: meQuery,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
  });
});
