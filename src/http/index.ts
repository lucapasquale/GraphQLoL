import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

import router from './router'
import graphQLSchema from '../graphql'
import makeLoaders from '../graphql/loaders'

export default async function main() {
  const app = new Koa()

  const { apiLoaders, dataLoaders } = await makeLoaders()
  Object.assign(app.context, {
    graphQLSchema,
    apiLoaders,
    dataLoaders,
  })

  app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

  return app
}
