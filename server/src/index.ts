import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'

async function main() {
  const server = new ApolloServer({ typeDefs, resolvers })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`Server ready at ${url}`)

  process.on('SIGTERM', async () => {
    await server.stop()
    process.exit(0)
  })
}

main().catch(console.error)
