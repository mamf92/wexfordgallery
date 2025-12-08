import type { FullListing } from '../api/listingsService';
import type { ListingCard } from '../components/ui/ListingCard';
// import type { Profile } from '../api/profilesService';
import { renderBrowseSection } from '../components/sections/BrowseSection';
/**
 * Renders the test page with various UI component demonstrations.
 */

export function renderTestPage() {
  const testViewContainer = document.createElement('section');
  testViewContainer.className =
    'flex flex-col items-center justify-center w-full gap-4 bg-aurora-silk py-8';
  const browseSection = renderBrowseSection(
    () => {},
    authenticatedListingCards
  );
  testViewContainer.appendChild(browseSection);

  return testViewContainer;
}

//Example listings, profiles data etc.
// const exampleProfile: Profile = {
//   name: 'catsarecute',
//   email: 'catsarecute@stud.noroff.no',
//   bio: 'This is my first bio entry.',
//   avatar: {
//     url: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400',
//     alt: 'A blurry multi-colored rainbow background',
//   },
//   banner: {
//     url: 'https://img.freepik.com/free-photo/close-up-kittens-exploring-nature_23-2150782397.jpg',
//     alt: 'Two fluffy kittens with blue eyes sitting close together on a tree log, illuminated by warm golden sunlight.',
//   },
//   credits: 1000,
//   _count: {
//     listings: 2,
//     wins: 0,
//   },
// };

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

const pokemonCardsListing: FullListing = {
  ...exampleListing,
  id: 'listing-pokemon-cards',
  title: 'Rare Pokémon Card Set',
  description: 'Holo and first editions in near-mint condition.',
  tags: ['pokemon', 'cards', 'collectibles'],
  media: [
    {
      url: 'https://dddprint.no/wp-content/uploads/2025/12/27ffd64b-8d3d-49b2-ae88-44f2b61c3eac.png',
      alt: 'Rare Pokémon cards',
    },
  ],
  bids: [],
};

const oldTypewriterListing: FullListing = {
  ...exampleListing,
  id: 'listing-old-typewriter',
  title: 'Vintage Typewriter',
  description: 'Mechanical typewriter with original keys, fully functional.',
  tags: ['vintage', 'typewriter', 'mechanical'],
  media: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MEK_II-371.jpg/2560px-MEK_II-371.jpg',
      alt: 'Old mechanical typewriter',
    },
  ],
  bids: [],
};

const diamondRingListing: FullListing = {
  ...exampleListing,
  id: 'listing-diamond-ring',
  title: 'Diamond Ring',
  description: 'Brilliant-cut diamond ring with elegant band.',
  tags: ['jewelry', 'diamond', 'ring'],
  media: [
    {
      url: 'https://kinclimg8.bluestone.com/f_jpg,c_scale,w_828,q_80,b_rgb:f0f0f0/giproduct/BISK0368R03_YAA18DIG4XXXXXXXX_ABCD00-PICS-00001-1024-66176.png',
      alt: 'Diamond ring',
    },
  ],
  bids: [],
};

const nordicSweaterListing: FullListing = {
  ...exampleListing,
  id: 'listing-nordic-sweater',
  title: 'Nordic Wool Sweater',
  description: 'Hand-knit Nordic sweater, warm and soft.',
  tags: ['fashion', 'wool', 'sweater'],
  media: [
    {
      url: 'https://shop.rmg.co.uk/cdn/shop/files/Nordic-Sweater-front.jpg?v=1727102377&width=480',
      alt: 'Nordic wool sweater',
    },
  ],
  bids: [],
};

const butterflyDuckListing: FullListing = {
  ...exampleListing,
  id: 'listing-butterfly-duck',
  title: 'Butterfly Wing Duck',
  description: 'Whimsical rubber duck with butterfly wings.',
  tags: ['toy', 'duck', 'novelty'],
  media: [
    {
      url: 'https://gifts.chesterzoo.org/cdn/shop/files/butterflyduck.jpg?v=1722335909',
      alt: 'Rubber duck with butterfly wings',
    },
  ],
  bids: [],
};

export const authenticatedListingCards: ListingCard[] = [
  {
    listing: exampleListing,
    listOptions: {
      isAuthenticated: true,
      withDescription: false,
      bidPreviouslyPlaced: true,
    },
  },
  {
    listing: pokemonCardsListing,
    listOptions: { isAuthenticated: true, withDescription: false },
  },
  {
    listing: diamondRingListing,
    listOptions: { isAuthenticated: true },
  },
  {
    listing: nordicSweaterListing,
    listOptions: { isAuthenticated: true },
  },
];

export const guestListingCards: ListingCard[] = [
  {
    listing: exampleListing2,
    listOptions: {
      withDescription: false,
      onUnauthenticatedBidAttempt: () => console.log('Please sign in to bid.'),
    },
  },
  {
    listing: oldTypewriterListing,
    listOptions: {
      onUnauthenticatedBidAttempt: () => console.log('Please sign in to bid.'),
    },
  },
  {
    listing: butterflyDuckListing,
    listOptions: {
      withDescription: false,
      onUnauthenticatedBidAttempt: () => console.log('Please sign in to bid.'),
    },
  },
];
