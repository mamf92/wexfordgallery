import { renderHeroSection } from '../components/sections/Hero';
import { renderLatestSection } from '../components/sections/LatestSection';
import { renderBidForm } from '../components/forms/BidForm';
import { isAuthenticated } from '../auth/authState';
import {
  getListingsBySearchQuery,
  getNewestActiveFullListings,
} from '../api/listingsService';
import { makeListingCards } from '../utils/mapListingsToCards';
import { requestConfirmation, showModal } from '../components/ui/Modals';
import type { ListingCard } from '../components/ui/ListingCard';
import { getUserName } from '../auth/authState';
import { getUserCredits } from '../auth/ProfileState';
import { placeBid } from '../api/bidsService';

const BASE = import.meta.env.BASE_URL;

export async function renderHomePage() {
  const homeViewContainer = document.createElement('section');
  homeViewContainer.className =
    'flex flex-col items-center justify-center w-full bg-aurora-silk py-8 gap-8';

  homeViewContainer.appendChild(
    renderHeroSection({
      heading: 'Watches',
      subheading: 'Explore our selection of watches.',
      items: await getListingsBySearchQuery('watch', {
        page: 1,
        limit: 4,
      }).then((res) => res?.data ?? []),
    })
  );

  homeViewContainer.appendChild(
    renderLatestSection(await prepareLatestListings())
  );

  return homeViewContainer;
}

async function prepareLatestListings(): Promise<ListingCard[]> {
  const listings = await getNewestActiveFullListings({
    page: 1,
    limit: 10,
  }).then((res) => res?.data ?? []);

  return makeListingCards({
    listings,
    isAuthenticated: isAuthenticated(),
    currentUserName: getUserName() || undefined, // pass current user
    withDescription: true,
    onBidButtonPress: (listingId: string, bidButton: HTMLElement) =>
      handleBid(listingId, bidButton),
    onUnauthenticatedBidAttempt: handleUnauthenticatedBid,
  });
}

async function handleBid(listingId: string, bidButton: HTMLElement) {
  const userName = getUserName();
  if (!userName) {
    handleUnauthenticatedBid();
    return;
  }

  const credits = await getUserCredits(userName);

  const parent = bidButton.parentElement;
  if (parent) {
    parent.replaceChild(
      renderBidForm(
        (e: SubmitEvent) => handleBidSubmit(e, listingId),
        credits.toString()
      ),
      bidButton
    );
  }
}

async function handleBidSubmit(e: SubmitEvent, listingId: string) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const bidAmount = (form.elements.namedItem('bid-amount') as HTMLInputElement)
    ?.value;

  await placeBid(listingId, { amount: parseInt(bidAmount) });
  handlePlacedBid(listingId);
}

function handlePlacedBid(listingId: string) {
  showModal({
    title: 'Bid Placed',
    message: 'Your bid has been placed successfully.',
    icon: 'success',
  });
  setTimeout(() => {
    window.location.href = `${BASE}listing/${listingId}`;
  }, 2000);
}

function handleUnauthenticatedBid() {
  requestConfirmation({
    title: 'Authentication Required',
    message: 'To place a bid, please log in or create an account.',
    icon: 'questionmark',
    confirmationLabel: 'Login / Sign Up',
    cancellationLabel: 'Continue browsing',
  }).then((confirmed) => {
    if (confirmed) {
      window.location.href = `${BASE}login`;
    }
  });
}
