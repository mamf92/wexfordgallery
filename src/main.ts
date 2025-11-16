import './style.css';
import { Router } from './router/Router';
import { routes } from './router/routes';

export function initializeApp() {
  const mainContainer = document.querySelector<HTMLElement>('main');
  if (!mainContainer) {
    throw new Error('Main container not found');
  }
  const router = new Router(routes, mainContainer);

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
