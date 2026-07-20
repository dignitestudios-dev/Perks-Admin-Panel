# Perks Admin Panel

## Executive Summary

The Perks Admin Panel is an enterprise-grade administrative dashboard designed to manage the Perks platform. Built entirely on a modern React ecosystem, the application focuses on high performance, maintainability, and a seamless developer experience. It provides secure administrative capabilities including user administration, content moderation, deep analytics, and system notifications.

## Architecture & Technology Stack

The application leverages a robust, modern frontend architecture optimized for scale:

### Core Framework & UI
*   **Next.js (App Router)**: Utilizes the Next.js App Router for server-side rendering, optimized routing, and enhanced performance.
*   **React 19**: Employs the latest React concurrency features and standard hooks.
*   **TypeScript**: Enforces strict static typing across the entire codebase to minimize runtime errors and improve developer tooling.
*   **Tailwind CSS v4 & PostCSS**: Utility-first CSS framework for highly responsive, consistent, and fast UI development.
*   **shadcn/ui & Radix UI**: Accessible, headless UI primitives combined with beautifully designed components, ensuring a cohesive design language.

### State Management & Data Fetching
*   **Redux Toolkit**: Manages complex global state such as authentication sessions and shared application configuration.
*   **TanStack React Query**: Handles server-state synchronization, providing out-of-the-box caching, background updates, and stale-data management.
*   **Axios**: Configured with custom interceptors for global error handling and automatic authorization header injection.

### Data Visualization & Utilities
*   **Recharts**: Provides declarative, responsive, and customizable charts for the analytics modules.
*   **React Hook Form & Zod**: Delivers performant, flexible, and extensible form validation.
*   **TanStack React Table**: Powers highly interactive, headless data grids for user and post management modules.

## Core Modules

The application is structured into domain-specific modules located within the `app/dashboard` directory:

1.  **Overview & Analytics**: High-level statistical summaries and graphical charts representing platform health and engagement metrics.
2.  **User Management**: Interfaces for monitoring registered users, viewing granular profile details, and executing moderation actions (e.g., blocking users).
3.  **Content Moderation (Posts)**: Dedicated views for reviewing, approving, or removing user-generated content.
4.  **System Notifications**: Centralized feed for administrative alerts and system health notifications.
5.  **Settings**: Application configuration and administrative profile management.

## Project Structure

```text
├── app/                  # Application routing and page definitions
│   ├── auth/             # Authentication flows (login, session recovery)
│   ├── dashboard/        # Authenticated dashboard views and sub-modules
│   ├── layout.tsx        # Root application layout
│   └── globals.css       # Global stylesheet and Tailwind directives
├── components/           # Shared UI components
│   ├── charts-and-graphs/# Custom Recharts wrappers and visualizers
│   ├── ui/               # Base shadcn/ui primitive components
│   └── ...               # Structural components (Navigations, Sidebars, Footers)
├── hooks/                # Reusable React hooks
├── lib/                  # Core application logic and utilities
│   ├── api/              # Modularized API clients and Axios configuration
│   ├── slices/           # Redux state slices (e.g., authSlice)
│   ├── store.ts          # Redux store instantiation
│   └── utils.ts          # General helper functions and formatting utilities
└── public/               # Static assets (fonts, images, icons)
```

## Local Development Guide

### Prerequisites

*   **Node.js**: v20.x or higher is recommended.
*   **Package Manager**: `npm` (v10+), `yarn`, or `pnpm`.

### Environment Configuration

The application requires environment variables to interface with the backend services. Create a `.env` file in the root directory:

```env
# Base URL for the Perks backend API
NEXT_PUBLIC_API_BASE_URL=https://api.the-perksapp.com/api
```

### Installation & Execution

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd Perks-Admin-Panel
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Access the application**:
    Navigate to `http://localhost:3000` in your preferred web browser.

## Build and Deployment

The application is optimized for deployment on Vercel or any standard Node.js hosting environment supporting Next.js.

*   **Production Build**: 
    Compiles the application, optimizing assets and generating static HTML where applicable.
    ```bash
    npm run build
    ```
*   **Start Production Server**: 
    Serves the optimized build artifacts.
    ```bash
    npm run start
    ```

## Code Standards & Linting

Code quality is enforced via ESLint and strict TypeScript compiler options. Before committing changes, ensure that all linting rules pass.

```bash
npm run lint
```
