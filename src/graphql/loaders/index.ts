import * as Dataloader from 'dataloader'

export default function() {
  return {
    test: new Dataloader((keys: string[]) => {
      return Promise.resolve(keys)
    }),
  }
}
