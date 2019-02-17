export const schema = `
  type Champion {
    id: String!
    key: Int!
    name: String!
    title: String!
  }
`

export const query = `
  champion(key: Int!): Champion
`
