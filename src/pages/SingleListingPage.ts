import { renderListingCard } from '../components/ui/ListingCard';
import { getFullListingById } from '../api/listingsService';
import { showModal, requestConfirmation } from '../components/ui/Modals';
import { isAuthenticated, getUserName } from '../auth/authState';
import { getUserCredits } from '../auth/ProfileState';
import { renderBidForm } from '../components/forms/BidForm';
import { placeBid } from '../api/bidsService';

const BASE = import.meta.env.BASE_URL;

export async function renderSingleListingPage(params?: Record<string, string>) {
  const listingContainer = document.createElement('div');
  listingContainer.className =
    'flex flex-col items-center justify-center w-full bg-aurora-silk py-8 px-4';

  try {
    if (!params?.id) {
      throw new Error('Listing ID is missing.');
    }

    const listing = await getFullListingById(params.id);

    const card = renderListingCard(listing.data, {
      isAuthenticated: isAuthenticated(),
      onBidButtonPress: (listingId: string, bidButton: HTMLElement) =>
        handleBid(listingId, bidButton),
      onUnauthenticatedBidAttempt: handleUnauthenticatedBid,
      bidPreviouslyPlaced: false,
      withDescription: true,
      withBidsOverview: true,
    });

    if (card) {
      card.className += ' md:max-w-[860px]';
      listingContainer.appendChild(card);
    }

    return listingContainer;
  } catch (error) {
    if (error instanceof Error) {
      showModal({
        title: 'Error fetching listing',
        message: error.message,
        icon: 'error',
      });
    }
  }

  return listingContainer;
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
  console.log('Placing bid of amount:', bidAmount, 'on listing:', listingId);

  await placeBid(listingId, { amount: parseInt(bidAmount) });
  console.log('Bid placed successfully.');
  handlePlacedBid(listingId);
}

function handlePlacedBid(listingId: string) {
  showModal({
    title: 'Bid Placed',
    message: 'Your bid has been placed successfully.',
    icon: 'success',
  });

  window.location.href = `${BASE}listing/${listingId}`;
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
