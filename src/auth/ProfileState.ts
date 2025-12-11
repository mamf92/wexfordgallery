import { getSingleProfile } from '../api/profilesService';
import type { Profile } from '../api/profilesService';

let cachedProfile: Profile | null;

export async function getUserCredits(userName: string): Promise<number> {
  if (!cachedProfile) {
    const response = await getSingleProfile(userName);
    cachedProfile = response.data;
  }
  return cachedProfile?.credits ?? 0;
}

export async function getCreditsForHeader(userName: string): Promise<number> {
  const response = await getSingleProfile(userName);
  return response.data?.credits ?? 0;
}

export function invalidateProfileCache() {
  cachedProfile = null;
}
