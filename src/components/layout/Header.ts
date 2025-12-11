import { LinkButton } from '../ui/Buttons';
import { Button } from '../ui/Buttons';
import { getCreditsForHeader } from '../../auth/ProfileState';

const BASE = import.meta.env.BASE_URL;

export type HeaderProps = 'home' | 'explore' | 'popular' | 'profile' | null;

export interface HeaderOptions {
  isAuthenticated: boolean;
  userName: string;
  currentPage: HeaderProps;
  onLogout: () => void;
}

/**
 * Creates the main header component with navigation and profile menu.
 */
export function Header(options: HeaderOptions): HTMLElement {
  const headerContainer = document.createElement('header');
  headerContainer.innerHTML = '';

  const renderAppropriateHeader = async () => {
    headerContainer.innerHTML = '';
    if (window.innerWidth < 768) {
      headerContainer.appendChild(await renderMobileHeader(options));
    } else {
      const desktopHeader = await renderDesktopHeader(options);
      headerContainer.appendChild(desktopHeader);
    }
  };

  renderAppropriateHeader();

  window.addEventListener('resize', renderAppropriateHeader);

  return headerContainer;
}

async function renderMobileHeader(
  options: HeaderOptions
): Promise<HTMLElement> {
  const { isAuthenticated, userName, onLogout } = options;
  const headerContent = document.createElement('div');
  headerContent.className =
    'relative flex items-center justify-between min-w-full max-w-full height-4.5rem py-4 pr-3 pl-4 bg-wexham-white';

  const logo = createLogo();
  headerContent.appendChild(logo);

  const profileButton = renderProfileButton(
    isAuthenticated,
    userName,
    onLogout,
    headerContent
  );
  headerContent.appendChild(profileButton);

  if (isAuthenticated) {
    const wrapper = document.createElement('div');
    wrapper.appendChild(headerContent);
    const creditsBar = await renderCreditsBar(userName);
    wrapper.appendChild(creditsBar);
    return wrapper;
  }

  return headerContent;
}

async function renderDesktopHeader(
  options: HeaderOptions
): Promise<HTMLElement> {
  const { isAuthenticated, userName, currentPage, onLogout } = options;

  const headerContent = document.createElement('div');
  headerContent.className =
    'relative grid grid-cols-3 md:grid-cols-[1fr_0.5fr_3fr_0.5fr_1fr] items-center justify-items-center min-w-full max-w-full height-4.5rem py-4 pr-3 pl-4 bg-wexham-white';

  const logo = createLogo();
  headerContent.appendChild(logo);

  const nav = renderNav(currentPage);
  nav.setAttribute('role', 'navigation');
  headerContent.appendChild(nav);

  const profileButton = renderProfileButton(
    isAuthenticated,
    userName,
    onLogout,
    headerContent
  );
  profileButton.className = `${profileButton.className} col-5 justify-self-end`;
  profileButton.setAttribute('aria-haspopup', 'true');
  headerContent.appendChild(profileButton);

  if (isAuthenticated) {
    const wrapper = document.createElement('div');
    wrapper.appendChild(headerContent);
    const creditsBar = await renderCreditsBar(userName);
    wrapper.appendChild(creditsBar);
    return wrapper;
  }

  return headerContent;
}

async function renderCreditsBar(userName: string): Promise<HTMLElement> {
  const creditsBar = document.createElement('div');
  creditsBar.className =
    'w-full h-8 bg-wexham-white border-t border-wexham-light flex items-center justify-end pr-4';

  try {
    const credits = await getCreditsForHeader(userName);
    const creditsText = document.createElement('span');
    creditsText.className = 'text-wexham-dark font-semibold';
    creditsText.textContent = `${credits} credits`;
    creditsBar.appendChild(creditsText);
  } catch (error) {
    console.error('Failed to fetch credits:', error);
  }

  return creditsBar;
}

function createLogo(): HTMLElement {
  const logo = document.createElement('a');
  logo.href = BASE;
  logo.tabIndex = 0;
  logo.className = 'col-1 font-heading text-3xl text-wexham-dark no-underline';
  logo.textContent = 'W';
  return logo;
}

type NavItem = {
  label: string;
  href: string;
  page: HeaderProps;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '', page: 'home' },
  { label: 'Explore', href: 'explore', page: 'explore' },
  { label: 'Popular', href: 'popular', page: 'popular' },
  { label: 'Profile', href: 'profile', page: 'profile' },
];

function renderNav(currentPage: HeaderProps): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'flex col-3 w-full justify-around xl:justify-between';

  NAV_ITEMS.forEach(({ label, href, page }) => {
    const link = LinkButton({
      label,
      href: `${BASE}${href}`,
      size: 'large',
      variant: currentPage === page ? 'secondary' : 'tertiary',
    });
    nav.appendChild(link);
  });

  return nav;
}

function renderProfileButton(
  isAuthenticated: boolean,
  userName: string,
  onLogout: () => void,
  headerContent: HTMLElement
): HTMLElement {
  if (isAuthenticated) {
    return Button({
      label: userName ? `Hi, ${userName}` : 'Menu',
      size: 'medium',
      variant: 'primary',
      onClick: (event) => {
        const trigger = event.currentTarget as HTMLElement;
        const menu = toggleProfileButtonMenu(trigger, onLogout, headerContent);
        if (menu) {
          headerContent.appendChild(menu);
          const firstItem = menu.querySelector<HTMLElement>('[data-menu-item]');
          firstItem?.focus();
        }
      },
    });
  } else {
    return LinkButton({
      label: 'Log in',
      href: `${BASE}login`,
      size: 'medium',
      variant: 'primary',
    });
  }
}

/**
 * Toggles the profile menu dropdown, closing it if open or opening it if closed.
 */
function toggleProfileButtonMenu(
  trigger: HTMLElement,
  onLogout: () => void,
  headerContent: HTMLElement
): HTMLElement | null {
  const existingMenu = headerContent.querySelector(
    '#profile-menu'
  ) as HTMLElement | null;

  if (existingMenu) {
    headerContent.removeChild(existingMenu);
    trigger?.setAttribute('aria-expanded', 'false');
    trigger?.focus();
    return null;
  } else {
    trigger?.setAttribute('aria-expanded', 'true');
    return renderProfileButtonMenu(trigger, onLogout, headerContent);
  }
}

/**
 * Configures an element as a menu item with proper styling and accessibility attributes.
 */
function createMenuItem(element: HTMLElement): HTMLElement {
  element.tabIndex = 0;
  element.dataset.menuItem = 'true';
  element.setAttribute('role', 'menuitem');
  element.className = `${element.className} block w-full text-left px-4 py-2 hover:bg-wexham-light`;
  return element;
}

/**
 * Sets up keyboard navigation and click-outside detection for the profile menu.
 * Handles arrow keys, Escape, Tab, and clicks outside the menu to close it.
 *
 * @returns Cleanup function to remove event listeners
 */
function setupMenuNavigation(
  menuContainer: HTMLElement,
  trigger: HTMLElement,
  headerContent: HTMLElement,
  onClose: () => void
): () => void {
  const items = Array.from(
    menuContainer.querySelectorAll<HTMLElement>('[data-menu-item]')
  );

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      cleanup();
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);
      const delta = e.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (currentIndex + delta + items.length) % items.length;
      items[nextIndex].focus();
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const activeElement = document.activeElement as HTMLElement;
      activeElement.click();
      cleanup(false);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      cleanup();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (!menuContainer.contains(target) && !trigger.contains(target)) {
      cleanup();
    }
  };

  const cleanup = (refocus: boolean = true) => {
    menuContainer.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleClickOutside);
    if (menuContainer.parentElement) {
      headerContent.removeChild(menuContainer);
    }
    trigger.setAttribute('aria-expanded', 'false');
    if (refocus) {
      trigger.focus();
    }
    onClose();
  };

  menuContainer.addEventListener('keydown', handleKeydown);
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);

  return cleanup;
}

function renderProfileButtonMenu(
  trigger: HTMLElement,
  onLogout: () => void,
  headerContent: HTMLElement
): HTMLElement {
  const menuContainer = document.createElement('div');
  menuContainer.className =
    'absolute top-16 right-3 bg-wexham-white border border-wexham-dark shadow-lg z-50';
  menuContainer.id = 'profile-menu';
  menuContainer.setAttribute('role', 'menu');

  const profileLink = createMenuItem(
    LinkButton({
      label: 'My Profile',
      href: `${BASE}profile`,
      size: 'medium',
      variant: 'tertiary',
    })
  );
  menuContainer.appendChild(profileLink);

  const logoutButton = createMenuItem(
    Button({
      label: 'Logout',
      size: 'medium',
      variant: 'tertiary',
      onClick: () => {
        onLogout();
        cleanup();
      },
    })
  );
  menuContainer.appendChild(logoutButton);

  const cleanup = setupMenuNavigation(
    menuContainer,
    trigger,
    headerContent,
    () => {}
  );
  return menuContainer;
}
