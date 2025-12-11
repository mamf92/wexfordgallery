import { renderHeroSection } from '../components/sections/Hero';
import { renderLatestSection } from '../components/sections/LatestSection';
import { renderBidForm } from '../components/forms/BidForm';
import { isAuthenticated } from '../auth/authState';
import {
  getListingsBySearchQuery,
  getNewestActiveFullListings,
} from '../api/listingsService';
import type { PaginationMeta } from '../api/listingsService';
import { makeListingCards } from '../utils/mapListingsToCards';
import { requestConfirmation, showModal } from '../components/ui/Modals';
import type { ListingCard } from '../components/ui/ListingCard';
import { getUserName } from '../auth/authState';
import { getUserCredits } from '../auth/ProfileState';
import { placeBid } from '../api/bidsService';
import { showInlineSpinner } from '../components/ui/Spinners';

const BASE = import.meta.env.BASE_URL;

export async function renderHomePage() {
  const homeViewContainer = document.createElement('section');
  homeViewContainer.className =
    'flex flex-col items-center justify-center w-full bg-aurora-silk py-8 gap-8';

  let latestListings: ListingCard[] = [];
  let currentPage = 1;
  let paginationMeta: PaginationMeta | null = null;

  // Render hero section
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

  // Load initial latest listings
  const initialData = await loadLatestListings(1);
  latestListings = initialData.cards;
  paginationMeta = initialData.meta;

  const handleLoadMore = async () => {
    if (!paginationMeta || paginationMeta.isLastPage) {
      return;
    }

    const loadMoreButton = document.getElementById('load-more-latest-button');
    if (loadMoreButton) {
      const spinner = showInlineSpinner('medium');
      loadMoreButton.replaceWith(spinner);
    }

    try {
      currentPage += 1;
      const newData = await loadLatestListings(currentPage);
      latestListings = [...latestListings, ...newData.cards];
      paginationMeta = newData.meta;

      renderLatestResults();
    } catch (error) {
      console.error('Error loading more listings:', error);
      showModal({
        title: 'Load Failed',
        message: 'Failed to load more listings. Please try again.',
        icon: 'error',
      });
      renderLatestResults();
    }
  };

  const renderLatestResults = () => {
    // Find and remove existing latest section
    const existingLatest =
      homeViewContainer.querySelector('section:last-child');
    if (existingLatest) {
      existingLatest.remove();
    }

    // Re-render with updated listings
    homeViewContainer.appendChild(
      renderLatestSection(
        latestListings,
        handleLoadMore,
        !paginationMeta?.isLastPage
      )
    );
  };

  // Render initial latest section
  homeViewContainer.appendChild(
    renderLatestSection(
      latestListings,
      handleLoadMore,
      !paginationMeta?.isLastPage
    )
  );

  return homeViewContainer;
}

async function loadLatestListings(
  page: number
): Promise<{ cards: ListingCard[]; meta: PaginationMeta }> {
  const response = await getNewestActiveFullListings({
    page,
    limit: 10,
  });

  const cards = makeListingCards({
    listings: response.data,
    isAuthenticated: isAuthenticated(),
    currentUserName: getUserName() || undefined,
    withDescription: true,
    onBidButtonPress: (listingId: string, bidButton: HTMLElement) =>
      handleBid(listingId, bidButton),
    onUnauthenticatedBidAttempt: handleUnauthenticatedBid,
  });

  return { cards, meta: response.meta };
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
