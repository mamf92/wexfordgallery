import { getSingleProfile } from '../api/profilesService';
import type { Profile } from '../api/profilesService';

let cachedProfile: Profile | null;

/**
 * Returns user credits with caching. Use for non-critical UI where stale data is acceptable.
 */
export async function getUserCredits(userName: string): Promise<number> {
  if (!cachedProfile) {
    const response = await getSingleProfile(userName);
    cachedProfile = response.data;
  }
  return cachedProfile?.credits ?? 0;
}

/**
 * Returns fresh user credits by bypassing cache. Use in header to ensure up-to-date display.
 */
export async function getCreditsForHeader(userName: string): Promise<number> {
  const response = await getSingleProfile(userName);
  return response.data?.credits ?? 0;
}

/**
 * Clears cached profile data. Call after profile updates.
 */
export function invalidateProfileCache() {
  cachedProfile = null;
}
