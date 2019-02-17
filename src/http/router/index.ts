import * as Router from 'koa-router'

import handleStatus from './status'
import handleGraphql from './graphql'

const router = new Router()

router.get('/status', handleStatus)
router.post('/graphql', handleGraphql)

export default router
