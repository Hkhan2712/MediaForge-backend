import {createClient} from 'redis'
import ENV from '../utils/env'

const redisClient = createClient({url: ENV.REDIS_URL})

redisClient.on('error', (err) => console.log('Redis Client Error', err))
redisClient.connect().catch((e) => console.log("Redis Connection Error", e))

export default redisClient