import type { FullListing } from '../api/listingsService';
import type { ListingCard } from '../components/ui/ListingCard';

type MakeCardsArgs = {
  listings: FullListing[];
  isAuthenticated?: boolean;
  withDescription?: boolean;
  onBidButtonPress?: (id: string) => void;
  onUnauthenticatedBidAttempt?: () => void;
  bidPreviouslyPlaced?: boolean;
};

export function makeListingCards({
  listings,
  isAuthenticated,
  withDescription,
  onBidButtonPress,
  onUnauthenticatedBidAttempt,
  bidPreviouslyPlaced,
}: MakeCardsArgs): ListingCard[] {
  return listings.map((listing) => ({
    listing,
    listOptions: {
      isAuthenticated,
      withDescription,
      onBidButtonPress,
      onUnauthenticatedBidAttempt,
      bidPreviouslyPlaced,
    },
  }));
}
