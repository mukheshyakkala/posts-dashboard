# ⚛️ React Vite Posts Management Dashboard

A modern, high-performance, and fully responsive enterprise dashboard built with **React**, **Vite**, and **Material UI (MUI)**. It features advanced data grids, mobile-optimized card layouts, live search, and full CRUD operations (Create, Read, Update, Delete).

---

## 📂 Project Architecture (Feature-Based Structure)

This project follows a scalable feature-driven directory structure, separating core domain logic from shared global assets and layout components:

react-crud-app/
├── public/                  # Static assets
├── src/
│   ├── app/                 # App-level configurations and providers
│   ├── features/
│   │   └── posts/           # Posts feature module
│   │       ├── components/  # Feature-specific components (PostsGrid, PostCard, PostFormDialog)
│   │       ├── hooks/       # Feature custom hooks (usePosts)
│   │       ├── pages/       # Feature page components (PostsPage)
│   │       └── services/    # Feature-specific API clients and handlers
│   ├── shared/              # Shared global elements
│   │   ├── components/      # Global components (Header, Footer, ConfirmDialog, ErrorBoundary, LoadingFallback)
│   │   └── hooks/           # Global shared hooks (useDebouncedValue)
│   ├── App.jsx              # Root component wrapper
│   ├── App.css              # Root application styling
│   ├── index.css            # Global base styles
│   ├── main.jsx             # Application entry point
│   └── theme.css            # Centralized design system tokens (colors, radii, shadows)
├── .gitignore               # Git ignored files configuration
├── eslint.config.js         # ESLint configuration
├── index.html               # Main HTML template
├── package.json             # Project dependencies and scripts
└── vite.config.js           # Vite build configuration

---

## ✨ Key Features

* **Responsive Design:** Automatically switches between a rich Material UI DataGrid (for desktop/tablet) and interactive card layouts (for mobile devices).
* **Live Search & Filtering:** Instant debounced search filtering by title and content description.
* **Full CRUD Operations:** Fully functional dialog forms for creating, editing, and deleting posts with confirmation dialogs.
* **Modern UI/UX:** Styled with custom headers, alternating zebra-stripe rows, soft shadows, and Material UI components.
* **Robust Error Handling:** Integrated Snackbar notifications and retry handlers for API failures.
Feature-Based Scalability: Clean separation of concerns grouping domain logic, components, hooks, and services under the features/posts module.
* **Centralized Design System (theme.css):** Global CSS variables and design tokens configured in theme.css for uniform colors, borders, and shadows across all components.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React.js, Vite
* **UI Library & Icons:** Material UI (MUI v6), `@mui/x-data-grid`, `@mui/icons-material`
* **State & Performance:** React Hooks (`useMemo`, `useCallback`, `useState`), Custom Debounce Hooks

---

### Demo
🌐 Live Demo: https://weather-sphere-one-woad.vercel.app/

## 🚀 Getting Started Locally

Follow these steps to run the project on your local machine:

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)
cd YOUR_REPOSITORY_NAME
