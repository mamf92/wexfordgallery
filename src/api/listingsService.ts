import { get, post, put, del } from './apiClient.ts';
import type { BaseUser } from './authService.ts';

/**
 * A media object representing an image or other media asset.
 */
export interface Media {
  url: string;
  alt: string;
}

/**
 * Seller of a listing, extends a regular profile with wins.
 */

interface Seller extends BaseUser {
  wins: string[];
}

/**
 * A bid object representing a bid on a listing.
 */

export interface BidInListing {
  id: string;
  amount: number;
  bidder: BaseUser;
  created: string; // ISO 8601 date string
}

/**
 * A listing object representing an item up for auction.
 */
export interface Listing {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  media: Media[];
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 time and date string
  endsAt: string; // ISO 8601 date string
  _count: { bids: number };
}

/**
 * A full listing object including seller and bids.
 */
export interface FullListing extends Listing {
  seller: Seller;
  bids: BidInListing[];
}

/** Pagination metadata for paginated API responses. */
export interface PaginationMeta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}

/**
 * Response type for generic posts.
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Response type for single item responses.
 */
export interface SingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

/**
 * Query params for pagination.
 */
export interface PaginationProps {
  page: number;
  limit: number;
}

/**
 * Form data for creating a new listing.
 */
export interface CreateListingFormData {
  title: string;
  description?: string | null;
  tags?: string[];
  media?: Media[];
  endsAt: string; // ISO 8601 date string
}

/**
 * Response type when new listing is successfully created.
 */
export interface CreateListingResponse {
  data: Listing;
  meta: Record<string, unknown>;
}

/**
 * Fetch full listings with pagination and limited results per page and with all available parameters (seller and bids).
 */

export async function getFullListings({
  page = 1,
  limit = 10,
}: PaginationProps): Promise<PaginatedResponse<FullListing>> {
  const response = await get<PaginatedResponse<FullListing>>(
    `/auction/listings?page=${page}&limit=${limit}&_seller=true&_bids=true`,
    false
  );
  if (!response) {
    throw new Error('Could not get listings.');
  }
  return response;
}

/**
 * Fetch simple listings with pagination and limited results per page.
 */

export async function getSimpleListings({
  page = 1,
  limit = 10,
}: PaginationProps): Promise<PaginatedResponse<Listing>> {
  const response = await get<PaginatedResponse<Listing>>(
    `/auction/listings?page=${page}&limit=${limit}`,
    false
  );
  if (!response) {
    throw new Error('Could not get listings.');
  }
  return response;
}

/**
 *
 * Fetch newest active listings with optional pagination and limited results per page.
 */
export async function getNewestActiveListings({
  page = 1,
  limit = 10,
}: PaginationProps): Promise<PaginatedResponse<Listing>> {
  const response = await get<PaginatedResponse<Listing>>(
    `/auction/listings?page=${page}&limit=${limit}&_sort=created&_active=true`,
    false
  );
  if (!response) {
    throw new Error('Could not get listings.');
  }
  return response;
}

/**
 *
 * Fetch newest active listings with optional pagination and limited results per page.
 */
export async function getNewestActiveFullListings({
  page = 1,
  limit = 10,
}: PaginationProps): Promise<PaginatedResponse<FullListing>> {
  const response = await get<PaginatedResponse<FullListing>>(
    `/auction/listings?page=${page}&limit=${limit}&_sort=created&_active=true&_seller=true&_bids=true`,
    false
  );
  if (!response) {
    throw new Error('Could not get listings.');
  }
  return response;
}

/**
 *
 * Fetch active listings with optional pagination and limited results per page.
 */
export async function getActiveListings({
  page = 1,
  limit = 10,
}: PaginationProps): Promise<PaginatedResponse<Listing>> {
  const response = await get<PaginatedResponse<Listing>>(
    `/auction/listings?page=${page}&limit=${limit}&_active=true`,
    false
  );
  if (!response) {
    throw new Error('Could not get listings.');
  }
  return response;
}

/**
 *
 * Fetch active listings by tag with optional pagination and limited results per page.
 */
export async function getActiveListingsWithTags(
  tag: string,
  { page = 1, limit = 10 }: PaginationProps
): Promise<PaginatedResponse<Listing>> {
  const response = await get<PaginatedResponse<Listing>>(
    `/auction/listings?_tag=${tag}&_active=true&page=${page}&limit=${limit}`,
    false
  );
  if (!response) {
    throw new Error('Could not get listings.');
  }
  return response;
}

/**
 *
 * Fetch a listing by its ID.
 */
export async function getListingById(
  listingId: string
): Promise<SingleResponse<Listing>> {
  const response = await get<SingleResponse<Listing>>(
    `/auction/listings/${listingId}`,
    false
  );
  if (!response) {
    throw new Error('Could not get listing.');
  }
  return response;
}

/**
 *
 * Fetch a full listing by its ID with included seller and bids information.
 */
export async function getFullListingById(
  listingId: string
): Promise<SingleResponse<FullListing>> {
  const response = await get<SingleResponse<FullListing>>(
    `/auction/listings/${listingId}?_bids=true&_seller=true`,
    false
  );
  if (!response) {
    throw new Error('Could not get listing.');
  }
  return response;
}

/**
 *
 * Fetch listings by search query with optional pagination and limited results per page.
 */
export async function getListingsBySearchQuery(
  query: string,
  { page = 1, limit = 10 }: PaginationProps
): Promise<PaginatedResponse<Listing>> {
  const response = await get<PaginatedResponse<Listing>>(
    `/auction/listings/search?q=${query}&page=${page}&limit=${limit}`
  );
  if (!response) {
    throw new Error('Could not get listings.');
  }
  return response;
}

// Create, Update, Delete Post operations

export async function createListing(
  data: CreateListingFormData
): Promise<CreateListingResponse> {
  const response = await post<CreateListingResponse>('/auction/listings', data);
  if (!response) {
    throw new Error('Error creating listing: No response data received.');
  }
  return response;
}

export async function updateListing(
  id: number,
  data: CreateListingFormData
): Promise<CreateListingResponse> {
  const response = await put<CreateListingResponse>(
    `/auction/listings/${id}`,
    data
  );
  if (!response) {
    throw new Error('Error updating listing: No response data received.');
  }
  return response;
}

export async function deleteListing(id: number): Promise<void> {
  const response = await del<void>(`/auction/listings/${id}`);
  if (response !== null) {
    throw new Error('Error deleting listing: Unexpected response received.');
  }
}
