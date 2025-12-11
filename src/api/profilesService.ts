import { get, put } from './apiClient';
import type { BaseUser } from './authService';
import type {
  SingleResponse,
  PaginatedResponse,
  PaginationProps,
  FullListing,
  Listing,
} from './listingsService';

/**
 * Full profile object including credits and counts.
 */
export interface Profile extends BaseUser {
  credits: number;
  _count: { listings: number; wins: number };
}

type ProfileUpdateData = Partial<Omit<BaseUser, 'name' | 'email'>>;

interface ProfileUpdateProps {
  name: string;
  data: ProfileUpdateData;
}

export interface ProfileQueryProps extends PaginationProps {
  name: string;
}

/**
 * Listing object without counts, used in bids with listings.
 */
type SimpleListing = Omit<Listing, '_count'>;

interface PlacedBidWithListing {
  id: number;
  amount: number;
  bidder: BaseUser;
  created: string;
  listing: SimpleListing;
}

type PlacedBid = Omit<PlacedBidWithListing, 'listing'>;

export async function getSingleProfile(
  name: string
): Promise<SingleResponse<Profile>> {
  const response = await get<SingleResponse<Profile>>(
    `/auction/profiles/${name}`
  );
  if (!response) {
    throw new Error('Could not fetch profile.');
  }
  return response;
}

/**
 * Fetch listings by profile with seller info and bids overview.
 */
export async function getFullListingsByProfile({
  name,
  page = 1,
  limit = 10,
}: ProfileQueryProps): Promise<PaginatedResponse<FullListing>> {
  const response = await get<PaginatedResponse<FullListing>>(
    `/auction/profiles/${name}/listings?_seller=true&_bids=true&page=${page}&limit=${limit}`
  );
  if (!response) {
    throw new Error('Could not fetch listings by profile.');
  }
  return response;
}

export async function getSimpleListingsByProfile({
  name,
  page = 1,
  limit = 10,
}: ProfileQueryProps): Promise<PaginatedResponse<Listing>> {
  const response = await get<PaginatedResponse<Listing>>(
    `/auction/profiles/${name}/listings?page=${page}&limit=${limit}`
  );
  if (!response) {
    throw new Error('Could not fetch listings by profile.');
  }
  return response;
}

/**
 * Fetch bids with full listing details attached.
 */
export async function getBidsWithListingsByProfile({
  name,
  page = 1,
  limit = 10,
}: ProfileQueryProps): Promise<PaginatedResponse<PlacedBidWithListing>> {
  const response = await get<PaginatedResponse<PlacedBidWithListing>>(
    `/auction/profiles/${name}/bids?page=${page}&limit=${limit}&_listings=true`
  );
  if (!response) {
    throw new Error('Could not fetch bids by profile.');
  }
  return response;
}

export async function getBidsByProfile({
  name,
  page = 1,
  limit = 10,
}: ProfileQueryProps): Promise<PaginatedResponse<PlacedBid>> {
  const response = await get<PaginatedResponse<PlacedBid>>(
    `/auction/profiles/${name}/bids?page=${page}&limit=${limit}`
  );
  if (!response) {
    throw new Error('Could not fetch bids by profile.');
  }
  return response;
}

export async function getWinsByProfile({
  name,
  page = 1,
  limit = 10,
}: ProfileQueryProps): Promise<PaginatedResponse<Listing>> {
  const response = await get<PaginatedResponse<Listing>>(
    `/auction/profiles/${name}/wins?page=${page}&limit=${limit}`
  );
  if (!response) {
    throw new Error('Could not fetch wins by profile.');
  }
  return response;
}

export async function updateProfile({
  name,
  data,
}: ProfileUpdateProps): Promise<SingleResponse<Profile>> {
  const response = await put<SingleResponse<Profile>>(
    `/auction/profiles/${name}`,
    data
  );
  if (!response) {
    throw new Error('Could not update profile.');
  }
  return response;
}

export async function getProfilesBySearchQuery(
  query: string,
  { page = 1, limit = 10 }: PaginationProps
): Promise<PaginatedResponse<Profile>> {
  const response = await get<PaginatedResponse<Profile>>(
    `/auction/profiles/search?q=${query}&page=${page}&limit=${limit}`
  );
  if (!response) {
    throw new Error('Could not get profiles.');
  }
  return response;
}
