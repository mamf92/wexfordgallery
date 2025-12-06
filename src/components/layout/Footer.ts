export function Footer() {
  const footerContainer = document.createElement('div');
  footerContainer.className = 'w-full py-24 px-14  bg-wexham-white';
  const footerContent = renderFooterContent();
  footerContainer.appendChild(footerContent);
  return footerContainer;
}

function renderFooterContent() {
  const content = document.createElement('div');

  content.className = `
  flex flex-col items-start gap-10
  md:grid md:grid-cols-2 md:grid-rows-3 md:gap-4
  lg:grid-cols-[1fr_1fr_1fr] lg:grid-rows-2 lg:gap-6 lg:max-w-[80%] lg:mx-auto`;
  const socials = createSocials();
  socials.className += ' md:col-2 md:row-1 lg:col-3 lg:row-1';
  const contactInfo = createContactInfo();
  contactInfo.className += ' md:col-1 md:row-2 lg:col-1 lg:row-1';
  const navLinks = createNavLinks();
  navLinks.className += ' md:col-1 md:row-1 lg:col-2 lg:row-1';
  const copyright = createCopyright();
  copyright.className +=
    ' md:col-2 md:row-3 md:col-span-3 lg:row-2 col-span-3 ';
  content.appendChild(socials);
  content.appendChild(contactInfo);
  content.appendChild(navLinks);
  content.appendChild(copyright);
  return content;
}

function createSocials() {
  const socialsContainer = document.createElement('div');
  socialsContainer.className = 'flex flex-col items-start gap-6 lg:gap-2';
  const socialLinks = createSocialLinks();
  socialsContainer.appendChild(socialLinks);
  const newsletterForm = createNewsletterForm();
  socialsContainer.appendChild(newsletterForm);
  return socialsContainer;
}

type SocialLink = {
  altLabel: string;
  href: string;
  iconSvg?: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    altLabel: 'Facebook',
    href: 'https://www.facebook.com/wexfordgallery',
    iconSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="" fill="#011526"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  },
  {
    altLabel: 'Instagram',
    href: 'https://www.instagram.com/wexfordgallery',
    iconSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="" fill="#011526"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"/><path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"/></svg>',
  },
];

function createSocialLinks() {
  const socialLinksContainer = document.createElement('div');
  socialLinksContainer.className = 'flex flex-col items-start';
  const header = document.createElement('h4');
  header.className = 'font-body text-wexham-dark text-sm';
  header.textContent = 'Follow us:';
  socialLinksContainer.appendChild(header);
  const linksContainer = document.createElement('div');
  linksContainer.className = 'flex gap-4 mt-2';
  SOCIAL_LINKS.forEach((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.setAttribute('aria-label', link.altLabel);
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'flex h-8 w-8';
    iconWrapper.innerHTML = link.iconSvg || '';
    anchor.appendChild(iconWrapper);
    linksContainer.appendChild(anchor);
  });
  socialLinksContainer.appendChild(linksContainer);

  return socialLinksContainer;
}

function createNewsletterForm() {
  const form = document.createElement('div');
  const newsLetterHeading = document.createElement('h4');
  newsLetterHeading.className = 'font-heading text-wexham-dark text-md';
  newsLetterHeading.textContent = 'Sign up to our Newsletter:';
  form.appendChild(newsLetterHeading);
  // TODO: Implement actual newsletter functionality

  return form;
}

function createContactInfo() {
  const contactInfoContainer = document.createElement('div');
  contactInfoContainer.className = 'flex flex-col gap-6';

  const heading = document.createElement('h4');
  heading.className = 'font-heading text-wexham-dark text-4xl';
  heading.textContent = 'Wexford Gallery';
  contactInfoContainer.appendChild(heading);
  const addressHeading = document.createElement('p');
  addressHeading.className = 'font-heading text-wexham-dark text-md';
  addressHeading.textContent = 'Address:';
  contactInfoContainer.appendChild(addressHeading);
  const addressDetails = document.createElement('p');
  addressDetails.className = 'font-body text-wexham-dark text-sm';
  addressDetails.textContent = '50 Wexford Ave, Hull HU9 5EJ, UK';
  contactInfoContainer.appendChild(addressDetails);

  const emailHeading = document.createElement('p');
  emailHeading.className = 'font-heading text-wexham-dark text-md';
  emailHeading.textContent = 'Contact:';
  contactInfoContainer.appendChild(emailHeading);
  const emailDetails = document.createElement('p');
  emailDetails.className = 'font-body text-wexham-dark text-sm';
  emailDetails.textContent = 'inquiries@wexfordgallery.com';
  contactInfoContainer.appendChild(emailDetails);
  return contactInfoContainer;
}

function createNavLinks() {
  const linksContainer = document.createElement('div');
  linksContainer.className = 'flex gap-6';
  const navLinksContainer = document.createElement('div');
  navLinksContainer.className = 'flex flex-col gap-2';
  const navLinksHeading = document.createElement('h4');
  navLinksHeading.className =
    'font-heading text-wexham-dark font-semibold text-sm';
  navLinksHeading.textContent = 'Quick Links:';
  navLinksContainer.appendChild(navLinksHeading);
  const links = ['Home', 'Explore', 'Popular', 'Profile'];
  links.forEach((linkText) => {
    const link = document.createElement('a');
    link.href = '#';
    link.className =
      'font-body text-wexham-dark text-sm hover:text-wexham-light';
    link.textContent = linkText;
    navLinksContainer.appendChild(link);
  });
  linksContainer.appendChild(navLinksContainer);
  const extraLinksContainer = document.createElement('div');
  extraLinksContainer.className = 'flex flex-col gap-2';
  const extraLinksHeading = document.createElement('h4');
  extraLinksHeading.className =
    'font-heading text-wexham-dark font-semibold text-sm';
  extraLinksHeading.textContent = 'More:';
  extraLinksContainer.appendChild(extraLinksHeading);
  const extraLinks = ['Privacy Policy', 'Terms of Service', 'Help Center'];
  extraLinks.forEach((linkText) => {
    const link = document.createElement('a');
    link.href = '#';
    link.className =
      'font-body text-wexham-dark text-sm hover:text-wexham-light';
    link.textContent = linkText;
    extraLinksContainer.appendChild(link);
  });
  linksContainer.appendChild(extraLinksContainer);
  return linksContainer;
}

function createCopyright() {
  const copyrightContainer = document.createElement('div');
  copyrightContainer.className =
    'text-wexham-blue text-sm text-center border-t-1 border-wexham-dark mt-3a';
  copyrightContainer.textContent =
    '© 2025 Wexford Gallery. All rights reserved.';
  return copyrightContainer;
}
