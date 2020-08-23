// This file shows how to use a function to create resolvers for you.
import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  InputType,
  Field,
  UseMiddleware,
} from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { Product } from "../../entity/Product";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";

function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    // Conditionally apply middleware before resolver runs, like the isAuth middleware
    @UseMiddleware(middleware || [])
    async create(@Arg("data", () => inputType) data: any) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

@InputType()
class ProductInput {
  @Field()
  name: string;
}

export const CreateUserResolver = createResolver(
  "User",
  User,
  RegisterInput,
  User
);

export const CreateProductResolver = createResolver(
  "Product",
  Product,
  ProductInput,
  Product
);
