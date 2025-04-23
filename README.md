# SoloType

![SoloType Banner](https://github.com/user-attachments/assets/0d2c58f5-fe1f-4c10-8486-292703d98fe0)

Welcome to **SoloType**, a typing practice website inspired by the thrilling world of "Solo Leveling"! Sharpen your typing skills, track your progress, and maybe even feel like a Hunter leveling up.

**[➡️ Visit the Live Application ⬅️](https://solotype-dscjfmbrdhbwawav.northeurope-01.azurewebsites.net/)**

## Overview

SoloType is a Solo Leveling themed typing test application that helps users improve their typing speed and accuracy. The application features a dark UI aesthetic inspired by the source material, with ranked typing tests and user progress tracking. The project is currently undergoing refactoring to improve code quality, maintainability, and adherence to development standards.

## Features

- **Typing Test Interface**: Clean, responsive interface with real-time WPM and accuracy calculation
- **Ranked Tests**: Practice with content of varying difficulty levels
- **Test History**: Track and review your previous typing test results
- **Dynamic Keyboard Display**: Visual feedback with highlighted keys as you type
- **User Authentication**: Secure login with Firebase Authentication
- **AI-Generated Content**: Test passages dynamically generated using AI

_Note: The visual theme and colors (including WPM progress bar colors) are intentionally preserved during refactoring._

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js API routes within Next.js
- **Database**: MongoDB for test results and user data
- **Authentication**: Firebase Authentication
- **State Management**: React Context API (moving to Zustand)
- **Package Manager**: PNPM
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Hosting**: Azure Web Apps

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- PNPM 8.x or higher
- MongoDB account (for database)
- Firebase project (for authentication)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/jay-021/SoloType.git
   cd SoloType
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the project root with the following variables:

   ```
   # Firebase (Authentication)
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=

   # Firebase Admin (Server-side)
   FIREBASE_ADMIN_CLIENT_EMAIL=
   FIREBASE_ADMIN_PRIVATE_KEY=

   # MongoDB
   MONGODB_URI=
   MONGODB_DB_NAME=
   ```

### Running Locally

Start the development server:

```
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run linting checks

## Architecture Summary

SoloType follows a modern architecture with:

- Next.js App Router for frontend page routing
- Layered API backend within Next.js (Controllers, Services, Repositories)
- MongoDB for persistent data storage
- Firebase Authentication for user management

For detailed architecture information, see [PLANNING.md](./PLANNING.md).

## Testing

_Note: Testing infrastructure is being set up as part of the refactoring effort._

Once implemented, you'll be able to run tests with:

```
pnpm test
```

## Deployment

Deployment is handled via GitHub Actions to Azure Web Apps. The CI/CD pipeline automatically builds and deploys the application when changes are pushed to the main branch.

## Contribution Guidelines

Please follow the coding standards outlined in [PLANNING.md](./PLANNING.md). Create feature branches off `main` and submit Pull Requests for review.

For active development tasks, see [TASK.md](./TASK.md).

---

_SoloType - Sharpen your typing skills in the world of Solo Leveling_
