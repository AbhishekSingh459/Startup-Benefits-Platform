# Startup Benefits & Partnerships Platform

A premium SaaS platform designed for early-stage startups to discover and claim exclusive benefits from industry-leading software partners. Built with a focus on polished UI/UX, smooth animations, and robust functionality.

## Features

-   `Animated Landing Page`: High-conversion hero section with scroll reveals
-   `Benefit Marketplace`: Sortable, searchable list of perks from vendors like AWS, Stripe, and HubSpot
-   `Claim Logic`: Intelligent check for user authentication and verification status
-   `User Dashboard`: Personalized space to track claims, savings, and verification status
-   `Auth System`: Fully functional Login and Registration with Zod validation
-   `Skeleton Loaders`: Elegant pulse animations for a premium fetching experience
-   `Responsive Design`: Optimized for mobile, tablet, and desktop

## Prerequisites

-   Node.js 18.x or higher
-   npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
    `npm install`

## How to Run

1. Start the development server:
    `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

-   `app/`: Next.js App Router pages and layouts
-   `components/`: Reusable UI components (DealCard, Navbar, SkeletonLoader)
-   `context/`: Global state management for Authentication
-   `hooks/`: Custom hooks for abstraction (`useAuth`, `useDeals`)
-   `lib/`: Mock API layer and data interfaces
-   `public/`: Static assets

## Configuration

This application uses a Mock API layer localized in `lib/api.ts`. No environment variables are strictly required for the demo, but you can integrate a real API by replacing the `api` object methods in that file.

## Troubleshooting

-   `Animations not playing`: Ensure you are using a modern browser that supports Framer Motion and hardware acceleration.
-   `Persistent Login`: The auth state is persisted to `localStorage`. To reset, click logout or clear your browser site data.
