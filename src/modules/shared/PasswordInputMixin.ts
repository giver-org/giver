import { Length } from "class-validator";
import { Field, InputType, ClassType } from "type-graphql";

/**
 * Useful for not redeclaring field and validation decorators wherever you need
 * to use it. Instead, just extend this class. Checkout the RegisterInput type
 * for usage.
 */

export const PasswordInputMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType({ isAbstract: true })
  class PasswordInput extends BaseClass {
    @Field()
    @Length(8, 30)
    password: string;
  }
  return PasswordInput;
};
