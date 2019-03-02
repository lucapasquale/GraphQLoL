import makeApiLoaders from './api'
import makeDataLoaders from './data'

export default async function(apiKey: string) {
  return {
    apiLoaders: makeApiLoaders(apiKey),
    dataLoaders: await makeDataLoaders(),
  }
}
