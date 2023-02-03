import { localCache } from '@/utils/cache'
export function isAdmin(roles = localCache.getCache('roles')) {
  if (!roles) return false
  const admin = roles.find((item: any) => item.id === 1)
  if (!admin || admin.length === 0) return false
  return true
}
