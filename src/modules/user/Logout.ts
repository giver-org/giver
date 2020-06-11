import { Mutation, Resolver, Ctx } from "type-graphql";
import { Context } from "../../types/Context";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async Logout(@Ctx() ctx: Context) {
    return new Promise((resolve, reject) => {
      ctx.req.session!.destroy(err => {
        if (err) {
          return reject(err);
        }

        ctx.res.clearCookie("qid");
        return resolve(true);
      });
    });
  }
}
