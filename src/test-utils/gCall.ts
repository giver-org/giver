import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "../utils/createSchema";
import Maybe from "graphql/tsutils/Maybe";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: number;
}

// Cache schema between calls.
let schema: GraphQLSchema;

/** Wrapper around graphql method useful for testing. */
export async function gCall({ source, variableValues, userId }: Options) {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  });
}
