import { renderHomePage } from '../pages/HomePage';
import { renderTestPage } from '../pages/TestPage';
import { renderLoginPage } from '../pages/LoginPage';

export const routes = {
  '/': renderHomePage,
  '/test': renderTestPage,
  '/login': renderLoginPage,
  '/explore': () => '<div>Explore page (todo)</div>',
  '/popular': () => '<div>Popular page (todo)</div>',
  '/profile': () => '<div>Profile page (todo)</div>',
};
