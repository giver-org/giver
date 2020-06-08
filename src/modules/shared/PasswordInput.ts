import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

/**
 * Useful for not redeclaring field and validation decorators wherever you need
 * to use it. Instead, just extend this class. Checkout the RegisterInput type
 * for usage.
 */

@InputType()
export class PasswordInput {
  @Field()
  @Length(8, 30)
  password: string;
}
