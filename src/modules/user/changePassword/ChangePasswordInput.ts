import { InputType, Field } from "type-graphql";
import { PasswordInputMixin } from "../../shared/PasswordInputMixin";

@InputType({ isAbstract: true })
export class ChangePasswordInput extends PasswordInputMixin(class {}) {
  @Field()
  token: string;
}
