export const schema = `
  scalar DateTime

  type Champion {
    id: String!
    key: Int!
    name: String!
    title: String!
  }

  type Spell {
    key: String!
    name: String!
  }

  type Season {
    id: Int!
    name: String
  }
`
