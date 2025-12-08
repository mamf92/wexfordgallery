import type { FullListing } from '../api/listingsService';
import type { Profile } from '../api/profilesService';
import { renderListingCard } from '../components/ui/ListingCard';
import { renderThumbnail } from '../components/ui/Thumbnail';
import { renderListingCardWithEditActions } from '../components/ui/ThumbnailWithEditActions';
import { renderProfileCard } from '../components/ui/ProfileCard';
import { renderBidForm } from '../components/forms/BidForm';
/**
 * Renders the test page with various UI component demonstrations.
 */

export function renderTestPage() {
  const testViewContainer = document.createElement('section');
  testViewContainer.className =
    'flex flex-col items-center justify-center w-full gap-4 bg-aurora-silk py-8';

  const profileCard = renderProfileCard(exampleProfile, (profileName) => {
    console.log(`Edit profile clicked for: ${profileName}`);
  });
  if (profileCard) {
    testViewContainer.appendChild(profileCard);
  }

  const listingGrid = document.createElement('div');
  listingGrid.className =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-4';
  testViewContainer.appendChild(listingGrid);

  const listingCardWithEdit = renderListingCardWithEditActions(exampleListing, {
    onEdit: () => {
      console.log('Edit action triggered');
    },
    onView: () => {
      console.log('View action triggered');
    },
    onDelete: () =>
      Promise.resolve().then(() => {
        console.log('Delete action triggered');
      }),
  });

  if (listingCardWithEdit) {
    listingGrid.appendChild(listingCardWithEdit);
  }

  const thumbnail = renderThumbnail(exampleListing);
  if (thumbnail) {
    listingGrid.appendChild(thumbnail);
  }
  const thumbnail2 = renderThumbnail(exampleListing2, {
    withDescription: true,
  });
  if (thumbnail2) {
    listingGrid.appendChild(thumbnail2);
  }
  const listingCard = renderListingCard(exampleListing, {
    bidPreviouslyPlaced: true,
    isAuthenticated: true,
    withDescription: true,
    onBidButtonPress: () => {
      const bidButton = document.getElementById('bid-button-container');
      if (bidButton)
        bidButton.replaceChildren(
          renderBidForm((event: SubmitEvent) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const bidAmount = formData.get('bid-amount') as string;
            console.log(`Bid placed: ${bidAmount} crdts`);
          }, '500')
        );
    },
  });
  if (listingCard) {
    listingGrid.appendChild(listingCard);
  }
  const listingCard2 = renderListingCard(exampleListing);
  if (listingCard2) {
    listingGrid.appendChild(listingCard2);
  }
  const listingCard3 = renderListingCard(exampleListing2);
  if (listingCard3) {
    listingGrid.appendChild(listingCard3);
  }
  const listingCard4 = renderListingCard(exampleListing);
  if (listingCard4) {
    listingGrid.appendChild(listingCard4);
  }

  return testViewContainer;
}

//Example listings, profiles data etc.
const exampleProfile: Profile = {
  name: 'catsarecute',
  email: 'catsarecute@stud.noroff.no',
  bio: 'This is my first bio entry.',
  avatar: {
    url: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400',
    alt: 'A blurry multi-colored rainbow background',
  },
  banner: {
    url: 'https://img.freepik.com/free-photo/close-up-kittens-exploring-nature_23-2150782397.jpg',
    alt: 'Two fluffy kittens with blue eyes sitting close together on a tree log, illuminated by warm golden sunlight.',
  },
  credits: 1000,
  _count: {
    listings: 2,
    wins: 0,
  },
};

const exampleListing: FullListing = {
  id: '13-39423d9b-8da6-468e-9758-46b68825f564',
  title: 'Vintage Painting',
  description: 'A beautiful vintage painting from the 19th century.',
  tags: ['vintage', 'painting', 'art'],
  media: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1280px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg',
      alt: 'Vintage Painting',
    },
    {
      url: 'https://images.unsplash.com/photo-1716467891152-1b43a96de578?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Vintage Painting',
    },
    {
      url: 'https://images.unsplash.com/photo-1663474665510-78745919c672?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Vintage Painting',
    },
  ],
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
  endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Ends in one week
  _count: { bids: 5 },
  seller: {
    wins: [],
    email: 'john.doe@example.com',
    bio: 'Art enthusiast and collector.',
    avatar: { url: 'https://example.com/avatar.jpg', alt: 'John Doe Avatar' },
    banner: { url: 'https://example.com/banner.jpg', alt: 'John Doe Banner' },
    name: 'John Doe',
  },
  bids: [
    {
      id: '39423d9b-8da6-468e-9758-46b68825f564',
      amount: 50,
      bidder: {
        name: 'testUser20',
        email: 'testUser20@stud.noroff.no',
        bio: 'Testing useabili',
        avatar: {
          url: 'https://images.unsplash.com/photo-1682946617589-a50b58dc73c7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          alt: "testUser20's avatar",
        },
        banner: {
          url: 'https://images.unsplash.com/photo-1639050660964-dd3a431fd40e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          alt: "testUser20's banner",
        },
      },
      created: '2025-05-09T10:39:29.033Z',
    },
    {
      id: '1bdf6a57-9219-4e1d-9a08-96399b782fb4',
      amount: 51,
      bidder: {
        name: 'Mari',
        email: 'marengs@stud.noroff.no',
        bio: 'Frontend student :)',
        avatar: {
          url: 'https://images.unsplash.com/photo-1622498159371-15d14f8acdaa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928',
          alt: 'User avatar',
        },
        banner: {
          url: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1792',
          alt: 'Profile banner',
        },
      },
      created: '2025-05-09T10:56:05.850Z',
    },
  ],
};

const exampleListing2: FullListing = {
  id: '13-39423d9b-8da6-468e-9758-46b68825f564',
  title: 'Vintage Painting',
  description: 'A beautiful vintage painting from the 19th century.',
  tags: ['vintage', 'painting', 'art'],
  media: [
    {
      url: 'https://images.unsplash.com/photo-1716467891152-1b43a96de578?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Vintage Painting',
    },
  ],
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
  endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Ends in one week
  _count: { bids: 5 },
  seller: {
    wins: [],
    email: 'john.doe@example.com',
    bio: 'Art enthusiast and collector.',
    avatar: { url: 'https://example.com/avatar.jpg', alt: 'John Doe Avatar' },
    banner: { url: 'https://example.com/banner.jpg', alt: 'John Doe Banner' },
    name: 'John Doe',
  },
  bids: [
    {
      id: '39423d9b-8da6-468e-9758-46b68825f564',
      amount: 50,
      bidder: {
        name: 'testUser20',
        email: 'testUser20@stud.noroff.no',
        bio: 'Testing useabili',
        avatar: {
          url: 'https://images.unsplash.com/photo-1682946617589-a50b58dc73c7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          alt: "testUser20's avatar",
        },
        banner: {
          url: 'https://images.unsplash.com/photo-1639050660964-dd3a431fd40e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          alt: "testUser20's banner",
        },
      },
      created: '2025-05-09T10:39:29.033Z',
    },
    {
      id: '1bdf6a57-9219-4e1d-9a08-96399b782fb4',
      amount: 51,
      bidder: {
        name: 'Mari',
        email: 'marengs@stud.noroff.no',
        bio: 'Frontend student :)',
        avatar: {
          url: 'https://images.unsplash.com/photo-1622498159371-15d14f8acdaa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928',
          alt: 'User avatar',
        },
        banner: {
          url: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1792',
          alt: 'Profile banner',
        },
      },
      created: '2025-05-09T10:56:05.850Z',
    },
  ],
};
