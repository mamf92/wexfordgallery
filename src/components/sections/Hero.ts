interface HeroSectionProps {
  heading: string;
  subheading: string;
  items: HTMLElement[];
}

export function renderHeroSection({
  heading,
  subheading,
  items,
}: HeroSectionProps): HTMLElement {
  const heroSection = document.createElement('section');
  heroSection.className = 'w-full h-96 flex items-center justify-center';
  const heroHeader = renderHeroHeader(heading, subheading);

  const heroCard = renderHeroContent(items);
  heroSection.appendChild(heroHeader);
  heroSection.appendChild(heroCard);
  return heroSection;
}

function renderHeroHeader(heading: string, subheading: string): HTMLElement {
  const heroHeader = document.createElement('div');
  heroHeader.className = 'flex flex-col gap-4';
  const heroHeading = document.createElement('h1');
  heroHeading.className = 'font-hero text-4xl md:text-5xl lg:text-6xl';
  heroHeading.textContent = `${heading}`;
  const heroSubheading = document.createElement('p');
  heroSubheading.className =
    'font-hero-sub text-lg md:text-xl lg:text-2xl uppercase';
  heroSubheading.textContent = `${subheading}`;
  heroHeader.appendChild(heroHeading);
  heroHeader.appendChild(heroSubheading);
  return heroHeader;
}

function renderHeroContent(items: HTMLElement[]): HTMLElement {
  const heroContent = document.createElement('div');
  heroContent.className =
    'text-center text-wexham-white bg-wexham-dark bg-opacity-50 p-8 rounded-lg';
  if (!items || items.length === 0) {
    throw new Error('Error loading hero content.');
  }
  if (items.length === 1) {
    const singleItemHero = renderSingleItemHero(items[0]);
    heroContent.appendChild(singleItemHero);
  } else {
    const multiItemHero = renderMultiItemHero(items);
    heroContent.appendChild(multiItemHero);
  }

  return heroContent;
}

function renderSingleItemHero(item: HTMLElement): HTMLElement {
  const singleItemContainer = document.createElement('div');
  singleItemContainer.appendChild(item);
  return singleItemContainer;
}

function renderMultiItemHero(items: HTMLElement[]): HTMLElement {
  const multiItemContainer = document.createElement('div');
  items.forEach((item) => {
    multiItemContainer.appendChild(item);
  });
  return multiItemContainer;
}
