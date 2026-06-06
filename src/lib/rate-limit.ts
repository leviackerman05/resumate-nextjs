import { Redis } from '@upstash/redis'
import type { UsageInfo } from './types'
import { DAILY_GENERATION_LIMIT } from './types'

const UNLIMITED_EMAILS = new Set(['singhpriyansh2000@gmail.com'])

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }

  return Redis.fromEnv()
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function hasUnlimitedGenerations(email: string) {
  return UNLIMITED_EMAILS.has(normalizeEmail(email))
}

function unlimitedUsage(): UsageInfo {
  return {
    used: 0,
    remaining: DAILY_GENERATION_LIMIT,
    limit: DAILY_GENERATION_LIMIT,
    unlimited: true,
  }
}

function getDailyKey(email: string) {
  const today = new Date().toISOString().slice(0, 10)
  return `cl:${normalizeEmail(email)}:${today}`
}

export async function getUsage(email: string): Promise<UsageInfo> {
  if (hasUnlimitedGenerations(email)) {
    return unlimitedUsage()
  }

  const redis = getRedis()

  if (!redis) {
    return {
      used: 0,
      remaining: DAILY_GENERATION_LIMIT,
      limit: DAILY_GENERATION_LIMIT,
    }
  }

  const count = Number((await redis.get<number>(getDailyKey(email))) ?? 0)

  return {
    used: count,
    remaining: Math.max(0, DAILY_GENERATION_LIMIT - count),
    limit: DAILY_GENERATION_LIMIT,
  }
}

export async function checkAndIncrementUsage(email: string) {
  if (hasUnlimitedGenerations(email)) {
    return {
      allowed: true,
      ...unlimitedUsage(),
    }
  }

  const redis = getRedis()

  if (!redis) {
    return {
      allowed: true,
      used: 0,
      remaining: DAILY_GENERATION_LIMIT,
      limit: DAILY_GENERATION_LIMIT,
    }
  }

  const key = getDailyKey(email)
  const count = await redis.incr(key)

  if (count === 1) {
    await redis.expire(key, 60 * 60 * 24)
  }

  if (count > DAILY_GENERATION_LIMIT) {
    await redis.decr(key)
    return {
      allowed: false,
      used: count - 1,
      remaining: 0,
      limit: DAILY_GENERATION_LIMIT,
    }
  }

  return {
    allowed: true,
    used: count,
    remaining: DAILY_GENERATION_LIMIT - count,
    limit: DAILY_GENERATION_LIMIT,
  }
}
