import 'reflect-metadata'
import {ApolloServer} from 'apollo-server-express'
import * as Express from 'express'
import {buildSchema, Resolver, Query} from 'type-graphql'

@Resolver()
class HelloResolver {
  @Query(() => String, {nullable: true, description: 'says hello to you'})
  async hello() {
    return 'hello world'
  }
}

(async function main() {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  })
  const apolloServer = new ApolloServer({schema})
  const app = Express()
  apolloServer.applyMiddleware({app})
  app.listen(3000, () => console.log('listening on http://localhost:3000'))
})()
