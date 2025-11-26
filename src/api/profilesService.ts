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
 * A full profile object including credits and counts of listings and wins.
 */
export interface Profile extends BaseUser {
  credits: number;
  _count: { listings: number; wins: number };
}

/**
 * Data for updating a profile, excluding immutable fields.
 */
type ProfileUpdateData = Partial<Omit<BaseUser, 'name' | 'email'>>;

/**
 * Properties required to update a profile.
 */
interface ProfileUpdateProps {
  name: string;
  data: ProfileUpdateData;
}

/**
 * Query properties for fetching by name with pagination.
 */
export interface ProfileQueryProps extends PaginationProps {
  name: string;
}

/** A simple listing object without counts. Used in bids with listings.
 */
type SimpleListing = Omit<Listing, '_count'>;

interface PlacedBidWithListing {
  id: number;
  amount: number;
  bidder: BaseUser;
  created: string; // ISO 8601 date string
  listing: SimpleListing;
}

/**
 * A placed bid object without the listing details. Used when fetching bids by profile.
 */
type PlacedBid = Omit<PlacedBidWithListing, 'listing'>;

/**
 *
 * Fetch a single profile by name.
 */
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
 *
 * Fetch full listings by profile name with seller info and bids overview. Optional pagination and limited results per page.
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

/**
 *
 * Fetch simple listings by profile name with optional pagination and limited results per page.
 */
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
 *
 * Fetch bids with listing details by profile name with optional pagination and limited results per page.
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

/**
 *
 * Fetch bids by profile name with optional pagination and limited results per page.
 */
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

/**
 *
 * Fetch wins by profile name with optional pagination and limited results per page.
 */
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

/**
 *
 * Update a profile by name with the provided data.
 */
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

/**
 * Fetch profiles by search query with optional pagination and limited results per page.
 */
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
