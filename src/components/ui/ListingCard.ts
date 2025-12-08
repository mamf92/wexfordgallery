import type {
  FullListing,
  BidInListing,
  Listing,
} from '../../api/listingsService';
import { Button } from './Buttons';
import { customScrollbar } from './CustomScrollbar';

const BASE = import.meta.env.BASE_URL;

export interface ListingCard {
  listing: FullListing;
  listOptions?: ListingCardOptions;
}

interface ListingCardOptions {
  isAuthenticated?: boolean;
  onBidButtonPress?: (listingId: string) => void;
  onUnauthenticatedBidAttempt?: () => void;
  bidPreviouslyPlaced?: boolean;
  withDescription?: boolean;
}

/**
 * Renders a listing card component.
 */

export function renderListingCard(
  listing: FullListing,
  options?: ListingCardOptions
): HTMLElement | null {
  if (!listing) {
    console.error('No listing data provided to renderListingCard.');
    return null;
  }

  const listingCard = document.createElement('article');
  listingCard.className =
    'listing-card relative flex flex-col border-wexham-dark border-t-1 border-b-1 h-min w-full bg-wexham-white';

  const mediaSection = renderMediaSection(listing);
  if (mediaSection) {
    listingCard.appendChild(mediaSection);
  }
  const contentSection = renderContentSection(listing, options);
  if (contentSection) {
    listingCard.appendChild(contentSection);
  }

  return listingCard;
}

//Sections

/**
 *
 * Renders the media section of the listing card.
 */

export function renderMediaSection(listing: FullListing): HTMLElement | null {
  if (!listing.media || listing.media.length === 0) {
    return null;
  }

  if (listing.media && listing.media.length === 1) {
    const mediaLink = document.createElement('a');
    mediaLink.className =
      'flex border-wexham-dark border-b-1 focus:border-[0.4rem] focus:border-wexham-blue hover:cursor-pointer h-80';
    mediaLink.href = BASE + `listing/${listing.id}`;
    mediaLink.tabIndex = 0;
    mediaLink.setAttribute('aria-label', `View post titled ${listing.title}`);

    const img = document.createElement('img');
    img.src = listing.media[0].url;
    img.alt = listing.media[0].alt || listing.title;
    img.className = 'object-cover hover:cursor-pointer';
    mediaLink.appendChild(img);
    return mediaLink;
  }

  if (listing.media && listing.media.length > 1) {
    const mediaSlider = document.createElement('div');
    mediaSlider.className = `flex overflow-x-scroll snap-x snap-mandatory ${customScrollbar} border-wexham-dark border-b-1 w-full h-80 gap-2`;
    listing.media.forEach((mediaItem) => {
      const mediaLink = document.createElement('a');
      mediaLink.className =
        'flex min-w-[90%] snap-center border-wexham-dark border-b-1 focus:border-[0.4rem] focus:border-wexham-blue hover:cursor-pointer';
      mediaLink.href = BASE + `listing/${listing.id}`;
      mediaLink.tabIndex = 0;
      mediaLink.setAttribute('aria-label', `View post titled ${listing.title}`);
      const scrollButtons = document.createElement('div');
      scrollButtons.className =
        'flex max-lg:hidden gap-2 w-full justify-between absolute top-69 left-1/2 transform -translate-x-1/2';
      const leftButton = Button({
        label: '‹ Previous',
        variant: 'tertiary',
        size: 'small',
        onClick: () => {
          mediaSlider.scrollBy({ left: -300, behavior: 'smooth' });
        },
      });
      leftButton.className += ' bg-wexham-white/70';
      const rightButton = Button({
        label: 'Next ›',
        variant: 'tertiary',
        size: 'small',
        onClick: () => {
          mediaSlider.scrollBy({ left: 300, behavior: 'smooth' });
        },
      });
      rightButton.className += ' bg-wexham-white/70';
      scrollButtons.appendChild(leftButton);
      scrollButtons.appendChild(rightButton);
      mediaSlider.appendChild(scrollButtons);

      const img = document.createElement('img');
      img.src = mediaItem.url;
      img.alt = mediaItem.alt || listing.title;
      img.className = 'object-cover w-full hover:cursor-pointer';
      mediaLink.appendChild(img);
      mediaSlider.appendChild(mediaLink);
    });
    return mediaSlider;
  }
  return null;
}

/**
 * Render the content section of the listing card.
 */

function renderContentSection(
  listing: FullListing,
  options?: {
    isAuthenticated?: boolean;
    onBidButtonPress?: (listingId: string) => void;
    onUnauthenticatedBidAttempt?: () => void;
    bidPreviouslyPlaced?: boolean;
    withDescription?: boolean;
  }
): HTMLElement {
  const content = document.createElement('div');
  content.className = `flex flex-col w-full gap-2 px-3 py-6 justify-center`;

  const listingMeta = renderListingMeta(listing);
  if (listingMeta) {
    content.appendChild(listingMeta);
  }

  const listingTitle = renderListingTitle(listing);
  content.appendChild(listingTitle);

  if (options?.withDescription && listing.description) {
    const description = renderDescription(listing);
    content.appendChild(description);
  }

  const listingLiveInfo = renderListingLiveInfo(listing);
  content.appendChild(listingLiveInfo);

  const bidButton = renderBidButton(listing, {
    onBidButtonPress: options?.onBidButtonPress,
    onUnauthenticatedBidAttempt: options?.onUnauthenticatedBidAttempt,
    bidPreviouslyPlaced: options?.bidPreviouslyPlaced,
    isAuthenticated: options?.isAuthenticated,
  });
  content.appendChild(bidButton);

  if (options?.isAuthenticated && listing.bids.length > 0) {
    const bidList = renderBidList(listing);
    content.appendChild(bidList);
  }

  return content;
}

/**
 * Renders the listing's meta information.
 */
function renderListingMeta(listing: FullListing): HTMLElement {
  const listingMeta = document.createElement('div');
  listingMeta.className = 'flex justify-between items-center';
  const seller = document.createElement('span');
  seller.className = 'font-body text-xs';
  seller.textContent = `Seller: ${listing.seller.name}`;
  listingMeta.appendChild(seller);

  const closesAt = document.createElement('span');
  closesAt.className = 'font-body text-xs text-wexham-dark';
  closesAt.textContent = `Closes: ${new Date(listing.endsAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}, ${new Date(listing.endsAt).toLocaleDateString()}`;
  listingMeta.appendChild(closesAt);

  return listingMeta;
}

/**
 * Render the listing title.
 */

function renderListingTitle(listing: FullListing): HTMLElement {
  const title = document.createElement('h3');
  title.className = 'font-heading font-semibold text-2xl';
  title.textContent = listing.title;
  return title;
}

/**
 * Renders the listing description.
 */
function renderDescription(listing: Listing): HTMLElement {
  const body = document.createElement('p');
  body.className = 'font-body text-xs';
  body.textContent = listing.description;
  return body;
}

/**
 * Renders the listing's live information including highest bid and time remaining.
 */

function renderListingLiveInfo(listing: FullListing): HTMLElement {
  const liveInfo = document.createElement('div');
  liveInfo.className = 'flex flex-col gap-2 items-center py-2';
  const highestBidContainer = document.createElement('div');
  highestBidContainer.className =
    'flex justify-between w-full border-t-1 border-wexham-dark py-2';
  const highestBid = document.createElement('span');
  highestBid.className = 'font-body text-sm';
  highestBid.textContent = `Highest Bid: $${listing.bids.at(-1)?.amount || '0'}`;
  highestBidContainer.appendChild(highestBid);

  const bidRefreshButton = Button({
    label: 'Refresh',
    variant: 'secondary',
    size: 'xsmall',
    onClick: () => {
      window.location.reload();
    },
  });
  highestBidContainer.appendChild(bidRefreshButton);
  liveInfo.appendChild(highestBidContainer);

  const timeRemainingContainer = document.createElement('div');
  timeRemainingContainer.className =
    'flex w-full border-b-1 border-wexham-dark py-1 justify-center';
  const timeRemaining = document.createElement('span');
  timeRemaining.className = 'font-body text-sm';
  timeRemaining.textContent = formatTimeRemaining(listing.endsAt);

  timeRemainingContainer.appendChild(timeRemaining);
  liveInfo.appendChild(timeRemainingContainer);
  return liveInfo;
}

/**
 * Renders the bid button with callback.
 */
function renderBidButton(
  listing: FullListing,
  options?: {
    onBidButtonPress?: (listingId: string) => void;
    onUnauthenticatedBidAttempt?: () => void;
    bidPreviouslyPlaced?: boolean;
    isAuthenticated?: boolean;
  }
): HTMLElement {
  const bidButtonContainer = document.createElement('div');
  bidButtonContainer.className = 'flex justify-center w-full mt-2';
  bidButtonContainer.id = 'bid-button-container';
  const bidButton = Button({
    label: options?.bidPreviouslyPlaced ? 'Place new bid?' : 'Place Bid',
    variant: 'primary',
    size: 'medium',
    onClick: () => {
      if (options?.isAuthenticated && options?.onBidButtonPress && listing.id) {
        options.onBidButtonPress(listing.id);
      } else if (
        !options?.isAuthenticated &&
        options?.onUnauthenticatedBidAttempt
      ) {
        options.onUnauthenticatedBidAttempt();
      }
    },
  });
  bidButtonContainer.appendChild(bidButton);
  return bidButtonContainer;
}

/**
 * Renders the bid list for the listing.
 */

function renderBidList(listing: FullListing): HTMLElement {
  const bidListContainer = document.createElement('div');
  bidListContainer.className = 'flex flex-col w-full mt-2';

  const bidListTitle = document.createElement('h4');
  bidListTitle.className = 'font-heading font-semibold text-lg mb-2';
  bidListTitle.textContent = 'Bids';
  bidListContainer.appendChild(bidListTitle);

  const bidList = document.createElement('ul');
  bidList.className = 'flex flex-col gap-2';

  listing.bids.forEach((bid) => {
    bidList.appendChild(renderBidItem(bid));
  });
  bidListContainer.appendChild(bidList);
  return bidListContainer;
}

/**
 * Renders a single bid item in the bid list.
 */

function renderBidItem(bid: BidInListing): HTMLElement {
  const bidItem = document.createElement('li');
  bidItem.className = 'flex justify-between border-wexham-dark border-b-1 pb-1';
  const bidderName = document.createElement('span');
  bidderName.className = 'flex flex-1 font-body text-sm';
  bidderName.textContent = bid.bidder.name;
  bidItem.appendChild(bidderName);

  const bidTime = renderBidTimestamp(bid.created);
  bidTime.className = 'flex flex-1 font-body text-sm gap-2';
  bidItem.appendChild(bidTime);

  const bidAmount = renderBidAmount(bid);
  bidAmount.className =
    'flex flex-1 font-body text-sm font-semibold justify-end';
  bidItem.appendChild(bidAmount);
  return bidItem;
}

/**
 * Renders the bid timestamp.
 */
function renderBidTimestamp(created: string): HTMLElement {
  const timeStampContainer = document.createElement('div');
  if (checkIfBidIsPlacedOnSameDay(created)) {
    const timePlaced = document.createElement('span');
    timePlaced.className = 'flex font-body text-xs text-wexham-dark';
    timePlaced.textContent = new Date(created).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    timeStampContainer.appendChild(timePlaced);
  } else {
    const timePlaced = document.createElement('span');
    timePlaced.className = 'flex font-body text-xs text-wexham-dark';
    timePlaced.textContent = new Date(created).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    timeStampContainer.appendChild(timePlaced);
    const datePlaced = document.createElement('span');
    datePlaced.className = 'flex font-body text-xs text-wexham-dark';
    datePlaced.textContent = new Date(created).toLocaleDateString();
    timeStampContainer.appendChild(datePlaced);
  }
  return timeStampContainer;
}

/**
 * Render bid amount.
 */
function renderBidAmount(bid: BidInListing): HTMLElement {
  const bidAmount = document.createElement('span');
  bidAmount.className =
    'flex flex-1 font-body text-sm font-semibold justify-end';
  bidAmount.textContent = `${bid.amount} crds`;
  return bidAmount;
}

// Utilities for Listing Card

function formatTimeRemaining(endsAt: string): string {
  const timeDiff = new Date(endsAt).getTime() - Date.now();

  if (timeDiff <= 0) {
    return 'Auction Ended';
  }

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  return `Time Remaining: ${hours}h ${minutes}m`;
}

function checkIfBidIsPlacedOnSameDay(bidCreated: string): boolean {
  const bidDate = new Date(bidCreated);
  const today = new Date();
  return bidDate.getDate() === today.getDate();
}
