import { get, post, put, del } from './apiClient.ts';
import type { BaseUser } from './authService.ts';

export interface Media {
  url: string;
  alt: string;
}

/** Seller profile including auction wins. */
interface Seller extends BaseUser {
  wins: string[];
}

export interface BidInListing {
  id: string;
  amount: number;
  bidder: BaseUser;
  created: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  media: Media[];
  created: string;
  updated: string;
  endsAt: string;
  _count: { bids: number };
}

export interface FullListing extends Listing {
  seller: Seller;
  bids: BidInListing[];
}

export interface PaginationMeta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface SingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface PaginationProps {
  page: number;
  limit: number;
}

export interface CreateListingFormData {
  title: string;
  description?: string | null;
  tags?: string[];
  media?: Media[];
  endsAt: string;
}

export interface CreateListingResponse {
  data: Listing;
  meta: Record<string, unknown>;
}

/** Fetch listings with seller and bids included. */
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

/** Fetch active listings sorted by creation date (newest first). */
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

/** Fetch active listings sorted by creation date with seller and bids included. */
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

/** Fetch listing by ID with seller and bids included. */
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
  id: string,
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

export async function deleteListing(id: string): Promise<void> {
  const response = await del<void>(`/auction/listings/${id}`);
  if (response !== null) {
    throw new Error('Error deleting listing: Unexpected response received.');
  }
}
