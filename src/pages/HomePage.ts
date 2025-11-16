export function renderHomePage() {
  const homeViewContainer = document.createElement('section');
  homeViewContainer.className =
    'flex flex-col items-center justify-center w-full';
  const heading = document.createElement('h1');
  heading.className = 'font-heading text-4xl text-wexham-light';
  heading.textContent = 'Welcome to Wexford Gallery!';
  homeViewContainer.appendChild(heading);
  const link = document.createElement('a');
  link.className = 'mt-6 text-wexham-dark underline';
  link.href = '/login';
  link.textContent = 'Go to Login';
  homeViewContainer.appendChild(link);
  return homeViewContainer;
}
