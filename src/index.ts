import http from './http'

async function main() {
  const app = await http()
  app.listen(8080)

  // tslint:disable-next-line
  console.log('App started')
}

main().catch(err => {
  // tslint:disable-next-line
  console.error('failed to start', err)
  throw err
})
