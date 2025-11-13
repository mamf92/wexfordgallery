# The Wexford Gallery Auction House Project

![The Wexford Gallery Banner](link)

---

**The Wexford Gallery** is a fictive auction web page where users can browse, bid, and sell items in an interactive online marketplace.  
Users can register and create their own profiles, add listings, bid on other users’ items, and track their auctions all in one place.

---

## 📋 Description

The Wexford Gallery is built as part of the **Noroff Semester Project 2**, designed to demonstrate planning, design, and development skills using JavaScript, TypeScript and a CSS framework, in this case Tailwind CSS 4. The project integrates with the **Noroff Auction House API** and follows all technical and design guidelines from the brief.

The application offers both registered and unregistered user experiences.  
Unregistered users can browse listings and view details, while registered users can participate in the full auction process.

---

## 🧩 Site Features

- 🔐 **User Registration & Login** – Register and login using a `@stud.noroff.no` email address.
- 👤 **User Profiles** – Each user can update their profile bio, avatar, and banner.
- 💰 **Credit System** – Users can view their available bidding credits on any page when logged in.
- 📦 **Create Listings** – Add new auction listings with a title, description, images, and auction end date.
- 📝 **Update & Delete Listings** – Manage and edit your active listings at any time.
- 🕑 **Bidding System** – Place bids on listings and view live bid history for transparency.
- 🔎 **Search & Filter** – Browse or search listings by keyword or category.
- 📱 **Responsive Design** – Clean, modern, and accessible interface optimized for mobile and desktop.
- ♿ **Accessibility** – Focused on keyboard navigation and clear visual hierarchy for all users.

---

## ⚙️ Built With

- [Vite](https://vitejs.dev/) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white) - Build tool and dev server
- [TypeScript](https://www.typescriptlang.org/) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) - For improved code reliability
- [Tailwind CSS](https://tailwindcss.com/) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-grey?style=flat&logo=tailwind-css&logoColor=38B2AC) - Utility-first CSS framework
- [Noroff Auction API](https://docs.noroff.dev/docs/v2/auction-house/listings) – Backend API

**Project Tools:**

- Visual Studio Code
- Figma for UI design and prototyping
- GitHub Projects for task management and planning

---

## 🚀 Getting Started

### 🔧 Installing

1. Clone the repository:

```bash
git clone https://github.com/mamf92/wexfordgallery.git
```

2. Navigate into the project folder:

```bash
cd wexfordgallery
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add your environment variables.

### Environment Variables

Copy `.env.example` to `.env` and update with your own values:

```
VITE_NOROFF_API_KEY=your-api-key-here
```

---

### 🧑‍💻 Running the App

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

---

### 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

Preview the built version locally:

```bash
npm run preview
```

---

### ✅ Code Quality

Run ESLint and Prettier formatting:

```bash
npm run lint
npm run format
```

---

### 🌐 Live Demo

👉 [https://mamf92.github.io/wexfordgallery/](https://mamf92.github.io/wexfordgallery/)  
_(placeholder – will update once deployed)_

---

## 🧭 User Stories

- As a user, I can register an account with my `@stud.noroff.no` email to participate in auctions.
- As a registered user, I can create, update, and delete my own listings.
- As a registered user, I can place bids on listings created by others.
- As a registered user, I can see my total credit, bids, and active listings on my profile.
- As any visitor, I can browse listings, search for specific items, and view details of a single listing.

---

## ✅ Assignment Requirements

This project meets the following **Semester Project 2** criteria:

- Uses **vanilla JavaScript / TypeScript** (no frameworks).
- Integrates with the **Noroff Auction House API (v2)**.
- Hosted on **GitHub Pages**.
- Follows modern and responsive **UI/UX** principles.
- Includes **accessibility** and **clean, modular code**.
- Features a **high-fidelity design prototype** in Figma.
- Repository maintained with **GitHub Projects** and clear commit history.

---

## 📄 License

© 2025 Martin Fischer. All rights reserved.

This project and its source code are protected under copyright law.  
You may not reproduce, distribute, modify, or use any part of this project or its content without explicit written permission from the author.

---

## 👤 Contact

- [LinkedIn – Martin Fischer](https://www.linkedin.com/in/mamf92/)
- [GitHub – @mamf92](https://github.com/mamf92)

---

## 🙏 Acknowledgments

- **Noroff Auction House API** documentation
- Noroff Frontend Development instructors and peers
- All open-source tools and libraries used

---
