export function paginated(type: string) {
  return `
    type Paginated${type} {
      totalCount: Int!
      nodes: [${type}!]
    }
  `
}

const seasons = {
  0: 'PRESEASON_3',
  1: 'SEASON_3',
  2: 'PRESEASON_2014',
  3: 'SEASON_2014',
  4: 'PRESEASON_2015',
  5: 'SEASON_2015',
  6: 'PRESEASON_2016',
  7: 'SEASON_2016',
  8: 'PRESEASON_2017',
  9: 'SEASON_2017',
  10: 'PRESEASON_2018',
  11: 'SEASON_2018',
  12: 'PRESEASON_2019',
  13: 'SEASON_2019',
}
export function parseSeasonId(seasonId: number) {
  return seasons[seasonId]
}
export function parseSeasonName(seasonName: string) {
  const key = Object.keys(seasons).find(k => {
    return seasons[k] === seasonName
  })

  return key && +key
}

const queues = {
  0: 'CUSTOM',
  400: 'DRAFT_5V5',
  420: 'RANKED_SOLO_5V5',
  430: 'BLIND_5V5',
  440: 'RANKED_FLEX_5V5',
  450: 'ARAM',
  460: 'BLIND_3V3',
  470: 'RANKED_3V3',
}
export function parseQueueId(queueId: number) {
  return queues[queueId]
}
export function parseQueueName(queueName: string): number {
  const key = Object.keys(queues).find(k => {
    return queues[k] === queueName
  })

  return key && +key
}
