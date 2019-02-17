import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

import router from './router'
import graphQLSchema from '../graphql'

export default async function main() {
  const app = new Koa()
  app.context.graphQLSchema = graphQLSchema

  app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
  return app
}
