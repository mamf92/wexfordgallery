import type { FullListing } from '../../api/listingsService';
import { renderSingleItemHero } from '../ui/SingleItemHero';
import { renderMultiItemHero } from '../ui/MultiItemHero';

interface HeroSectionProps {
  heading: string;
  subheading: string;
  items: FullListing[];
}

export function renderHeroSection({
  heading,
  subheading,
  items,
}: HeroSectionProps): HTMLElement {
  const heroSection = document.createElement('section');
  heroSection.className =
    'flex flex-col gap-4 w-full flex items-center justify-center';
  const heroHeader = renderHeroHeader(heading, subheading);

  const heroCard = renderHeroContent(items);
  heroCard.className += ' relative';
  heroSection.appendChild(heroHeader);
  heroSection.appendChild(heroCard);
  return heroSection;
}

function renderHeroHeader(heading: string, subheading: string): HTMLElement {
  const heroHeader = document.createElement('div');
  heroHeader.className = 'flex flex-col w-full gap-4 px-4';
  const heroHeading = document.createElement('h1');
  heroHeading.className = 'font-hero text-4xl text-wexham-white';
  heroHeading.textContent = `${heading}`;
  const heroSubheading = document.createElement('p');
  heroSubheading.className =
    'font-hero-sub text-lg text-wexham-white uppercase';
  heroSubheading.textContent = `${subheading}`;
  heroHeader.appendChild(heroHeading);
  heroHeader.appendChild(heroSubheading);
  return heroHeader;
}

function renderHeroContent(items: FullListing[]): HTMLElement {
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
