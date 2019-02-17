import { Context } from 'koa'

export default async function(ctx: Context) {
  ctx.body = {
    name: 'GraphQLoL',
    status: 'ok',
  }
}
