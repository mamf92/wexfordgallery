import { put } from './apiClient';
import type { Listing, SingleResponse } from './listingsService';

/**
 * A bid object for placing a new bid.
 */

interface Bid {
  amount: number;
}

/**
 *
 * Place a bid on a listing by its ID.
 */
export async function placeBid(
  listingId: number,
  data: Bid
): Promise<SingleResponse<Listing>> {
  const response = await put<SingleResponse<Listing>>(
    `/auction/listings/${listingId}/bids`,
    data
  );
  if (!response) {
    throw new Error('Could not place bid.');
  }
  return response;
}
