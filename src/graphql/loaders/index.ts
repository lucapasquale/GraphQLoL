import makeApiLoaders from './api'
import makeDataLoaders from './data'

export default async function() {
  return {
    apiLoaders: makeApiLoaders(),
    dataLoaders: await makeDataLoaders(),
  }
}
