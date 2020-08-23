/** Integration tests for register resolver. */

import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import { User } from "../../../entity/User";

let conn: Connection;

jest.setTimeout(10000);

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async (done) => {
  await conn.close();
  done();
});

const registerMutation = `
  mutation Register ($data: RegisterInput!){
    register(data: $data) {
      id
      firstName
      lastName
      name
      email
    }
  }
`;

describe("Register", () => {
  it("create user", async () => {
    // Make fake user.
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    // Execute response.
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    // Test the resolver response.
    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });

    // Test that expected user is in db.
    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser).toMatchObject({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    expect(dbUser!.confirmed).toBeFalsy();
  });
});
