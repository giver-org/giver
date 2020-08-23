import { buildSchema } from "type-graphql";
import { MeResolver } from "../modules/user/Me";
import { RegisterResolver } from "../modules/user/Register";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";

export const createSchema = () => {
  return buildSchema({
    resolvers: [
      MeResolver,
      RegisterResolver,
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
    ],
    authChecker({ context: { req } }) {
      return !!req.session.userId;
    },
  });
};
