/* tslint:disable:no-console */
import makeServer from './http'

async function main() {
  const app = await makeServer()
  app.listen(8080)

  console.log('- App started -')
}

main().catch(err => {
  console.error('failed to start', err)
  throw err
})
