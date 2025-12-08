import { renderHomePage } from '../pages/HomePage';
import { renderTestPage } from '../pages/TestPage';
import { renderLoginPage } from '../pages/LoginPage';
import { renderRegistrationPage } from '../pages/RegistrationPage';

export const routes = {
  '/': renderHomePage,
  '/test': renderTestPage,
  '/login': renderLoginPage,
  '/register': renderRegistrationPage,
  '/explore': () => '<div>Explore page (todo)</div>',
  '/popular': () => '<div>Popular page (todo)</div>',
  '/profile': () => '<div>Profile page (todo)</div>',
};
