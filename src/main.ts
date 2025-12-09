import './style.css';
import { Router } from './router/Router';
import { routes } from './router/routes';
import { Header } from './components/layout/Header';
import type { HeaderProps } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { isAuthenticated, getUserName, clearAuthState } from './auth/authState';
import { showPageSpinner } from './components/ui/Spinners';

const BASE = import.meta.env.BASE_URL;

/**
 * Initializes the application by setting up the router and rendering the initial view.
 */
export function initializeApp() {
  const headerContainer = document.querySelector<HTMLElement>('header');
  const mainContainer = document.querySelector<HTMLElement>('main');
  const footerContainer = document.querySelector<HTMLElement>('footer');

  if (!mainContainer || !headerContainer || !footerContainer) {
    throw new Error('Main, header, or footer container not found');
  }

  showPageSpinner('large', mainContainer);

  const isAuthenticatedFlag = isAuthenticated();
  const userName = getUserName();
  const onLogout = () => {
    clearAuthState();
    window.location.reload();
  };

  const getCurrentPage = (pathname: string): HeaderProps => {
    const path = pathname.startsWith(BASE)
      ? pathname.slice(BASE.length - 1) || '/'
      : pathname;

    switch (path) {
      case '/':
        return 'home';
      case '/explore':
        return 'explore';
      case '/popular':
        return 'popular';
      case '/profile':
        return 'profile';
      default:
        return null;
    }
  };

  const renderHeader = (path: string) => {
    const currentPage = getCurrentPage(path);
    headerContainer.innerHTML = '';
    headerContainer.appendChild(
      Header({
        isAuthenticated: isAuthenticatedFlag,
        userName,
        currentPage,
        onLogout,
      })
    );
  };

  // Render header and footer once
  renderHeader(window.location.pathname);
  footerContainer.innerHTML = '';
  footerContainer.appendChild(Footer());

  // Initialize router with callback to update header on navigation
  const router = new Router(routes, mainContainer, (path) => {
    renderHeader(path);
  });

  setupNavigation(router);
  router.resolveRoute();
}

function setupNavigation(router: Router) {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href]') as HTMLAnchorElement;
    if (link && link.href.startsWith(window.location.origin)) {
      event.preventDefault();
      const url = new URL(link.href);
      router.navigate(url.pathname);
    }
  });
}

initializeApp();
