export const resolver = {
  Query: {
    test: (obj: any, _: any, ctx: any) => {
      return {
        value: 'valor',
      }
    },
  },
}
