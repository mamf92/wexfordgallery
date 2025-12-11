import { renderHomePage } from '../pages/HomePage';
import { renderTestPage } from '../pages/TestPage';
import { renderLoginPage } from '../pages/LoginPage';
import { renderRegistrationPage } from '../pages/RegistrationPage';
import { renderSingleListingPage } from '../pages/SingleListingPage';
import { renderProfilePage } from '../pages/ProfilePage';
import { renderEditProfilePage } from '../pages/EditProfilePage';
import { renderCreateListingPage } from '../pages/CreateListingPage';

export const routes = {
  '/': () => renderHomePage(),
  '/test': () => renderTestPage(),
  '/login': () => renderLoginPage(),
  '/register': () => renderRegistrationPage(),
  '/explore': () => '<div>Explore page (todo)</div>',
  '/popular': () => '<div>Popular page (todo)</div>',
  '/profile': () => renderProfilePage(),
  '/edit-profile': () => renderEditProfilePage(),
  '/listing/:id': (params?: Record<string, string>) =>
    renderSingleListingPage(params),
  '/create-listing': () => renderCreateListingPage(),
};
