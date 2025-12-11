import type { FullListing } from '../api/listingsService';
import type { ListingCard } from '../components/ui/ListingCard';

export type MakeCardsArgs = {
  listings: FullListing[];
  isAuthenticated?: boolean;
  withDescription?: boolean;
  onBidButtonPress?: (id: string, bidButton: HTMLElement) => void;
  onUnauthenticatedBidAttempt?: () => void;
  bidPreviouslyPlaced?: boolean;
  currentUserName?: string;
};

export function makeListingCards({
  listings,
  isAuthenticated,
  withDescription,
  onBidButtonPress,
  onUnauthenticatedBidAttempt,
  bidPreviouslyPlaced,
  currentUserName,
}: MakeCardsArgs): ListingCard[] {
  return listings.map((listing) => ({
    listing,
    listOptions: {
      isAuthenticated,
      withDescription,
      onBidButtonPress,
      onUnauthenticatedBidAttempt,
      bidPreviouslyPlaced,
      currentUserName,
    },
  }));
}
