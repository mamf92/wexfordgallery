import type { FullListing, Listing } from '../../api/listingsService';
import { renderSingleItemHero } from '../ui/SingleItemHero';
import { renderMultiItemHero } from '../ui/MultiItemHero';

interface HeroSectionProps {
  heading: string;
  subheading: string;
  items: FullListing[] | Listing[];
}

export function renderHeroSection({
  heading,
  subheading,
  items,
}: HeroSectionProps): HTMLElement {
  const heroSection = document.createElement('section');
  heroSection.className =
    'flex flex-col gap-4 w-full flex items-center justify-center';
  const sectionHeader = renderSectionHeader(heading, subheading);

  const heroCard = renderHeroContent(items);
  heroCard.className += ' relative';
  heroSection.appendChild(sectionHeader);
  heroSection.appendChild(heroCard);
  return heroSection;
}

export function renderSectionHeader(
  heading: string,
  subheading: string
): HTMLElement {
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'flex flex-col w-full gap-4 px-4';
  const sectionHeading = document.createElement('h1');
  sectionHeading.className = 'font-hero text-4xl xl:text-6xl text-wexham-white';
  sectionHeading.textContent = `${heading}`;
  const sectionSubheading = document.createElement('p');
  sectionSubheading.className =
    'font-hero-sub text-lg text-wexham-white uppercase';
  sectionSubheading.textContent = `${subheading}`;
  sectionHeader.appendChild(sectionHeading);
  sectionHeader.appendChild(sectionSubheading);
  return sectionHeader;
}

function renderHeroContent(items: FullListing[] | Listing[]): HTMLElement {
  const heroContent = document.createElement('div');
  heroContent.className = 'flex flex-col w-full';
  if (!items || items.length === 0) {
    throw new Error('Error loading hero content.');
  }
  if (items.length === 1) {
    const singleItemHero = renderSingleItemHero(items[0], {
      withDescription: true,
    });
    if (!singleItemHero) {
      throw new Error('Error rendering single item hero.');
    }
    heroContent.appendChild(singleItemHero);
  } else {
    const multiItemHero = renderMultiItemHero({
      listings: items,
      withDescription: true,
    });
    if (!multiItemHero) {
      throw new Error('Error rendering multi item hero.');
    }
    heroContent.appendChild(multiItemHero);
  }
  return heroContent;
}
