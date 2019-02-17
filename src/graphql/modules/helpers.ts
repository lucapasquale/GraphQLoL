export function paginated(type: string) {
  return `
    type Paginated${type} {
      totalCount: Int!
      nodes: [${type}!]
    }
  `
}
