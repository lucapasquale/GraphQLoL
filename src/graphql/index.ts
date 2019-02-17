import * as path from 'path'
import * as glue from 'schemaglue'
import { makeExecutableSchema } from 'graphql-tools'

const sourceFolder = path.basename(path.dirname(__dirname))

const modules = glue(`${sourceFolder}/graphql/modules`, {
  mode: sourceFolder === 'build' ? 'js' : 'ts',
  ignore: '**/spec.*',
})

export default makeExecutableSchema({
  typeDefs: modules.schema,
  resolvers: modules.resolver,
})
