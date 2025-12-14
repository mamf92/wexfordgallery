import { post } from './apiClient';
import type { Listing, SingleResponse } from './listingsService';

interface Bid {
  amount: number;
}

/**
 * Places a bid on a listing and returns the updated listing with the new bid.
 */
export async function placeBid(
  listingId: string,
  data: Bid
): Promise<SingleResponse<Listing>> {
  const response = await post<SingleResponse<Listing>>(
    `/auction/listings/${listingId}/bids`,
    data
  );
  if (!response) {
    throw new Error('Could not place bid.');
  }
  return response;
}
